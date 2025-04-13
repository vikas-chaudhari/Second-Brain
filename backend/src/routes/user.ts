import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { userModel } from "../db/user";
import jwt from "jsonwebtoken";
import { checkAuth } from "../middleware/user";
import { contentModel } from "../db/content";
const router = Router();

router.post("/signup", async (req, res) => {
  const signupSchema = z.object({
    username: z.string().min(3).max(10),
    password: z
      .string()
      .min(8)
      .max(20)
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      ),
  });
  const { username, password } = req.body;
  try {
    const isValidated = signupSchema.safeParse({ username, password });

    if (!isValidated.success) {
      res
        .status(411)
        .json({ error: isValidated.error, msg: "Error in inputs" });
      return;
    }

    const user = await userModel.findOne({ username });
    if (user) {
      res.status(403).json({ msg: "User already exists with this username" });
      return;
    }

    // password Hashing
    const hashedPassword = await bcrypt.hash(password, 3);

    await userModel.create({ username, password: hashedPassword });
    res.status(200).json({ msg: "Signed up", username });
    return;
  } catch (err) {
    res.status(500).json({ msg: "server Error" });
  }
});

router.post("/signin", async (req, res) => {
  const signinSchema = z.object({
    username: z.string().min(3).max(10),
    password: z
      .string()
      .min(8)
      .max(20)
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      ),
  });
  const { username, password } = req.body;
  try {
    const isValidated = signinSchema.safeParse({ username, password });

    if (!isValidated.success) {
      res
        .status(411)
        .json({ error: isValidated.error, msg: "Error in inputs" });
      return;
    }

    const user = await userModel.findOne({
      username,
    });
    if (!user) {
      res.status(403).json({ msg: "Wrong email password" });
      return;
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (isPasswordMatched) {
      const token = jwt.sign(
        {
          username,
        },
        `${process.env.USER_JWT_SECRET}`
      );

      res.status(200).json({ token, msg: "Signed in" });
      return;
    } else {
      res.status(403).json({ msg: "Wrong password" });
      return;
    }

    // Json Web Token
  } catch (err) {
    res.status(500).json({ msg: "server Error" });
  }
});

router.post("/add-content", checkAuth, async (req, res) => {
  const contentSchema = z.object({
    link: z.string(),
    type: z.enum(["tweet", "video", "document", "link"]),
    title: z.string(),
    tags: z.array(z.string()),
  });

  const { link, type, title, tags, userId } = req.body;

  if (type === "document") {
    // store data in vector db from here
  }

  if (!link || !type || !title || !tags) {
    res.json({ ERROR: "Insufficient data" });
  }
  let tagsId: string[] = [];
  interface tagInterface {
    _id: string;
    title: string;
  }
  tags.forEach((tag: tagInterface) => {
    tagsId.push(tag._id);
  });
  console.log("tagsId = ", tagsId);

  const user = await userModel.findOne({ username: req.username });
  console.log(user);

  const IsValidated = contentSchema.safeParse({
    link,
    type,
    title,
    tags: tagsId,
    user,
  });

  if (!IsValidated.success || !user) {
    res.json({ ERROR: IsValidated.error });
    return;
  }

  const data = await contentModel.create({
    link,
    type,
    title,
    tags,
    userId: user._id,
  });
  console.log(data);
  // const content = await contentModel.find({ userId: user._id });

  res.json(data);
});

router.delete("/delete-content/:id", checkAuth, async (req, res) => {
  const contentId = req.params.id;
  console.log(contentId);
  const data = await contentModel.findOneAndDelete({ _id: contentId });
  res.json(contentId);
});

router.post("/search", checkAuth, async (req, res) => {
  const { prompt } = req.body;
  res.json(prompt);
});

export const userRouter = router;
