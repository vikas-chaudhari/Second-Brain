import express from "express";
import { userRouter } from "./routes/user";
import { connect } from "mongoose";
import { checkAuth } from "./middleware/user";
import { z } from "zod";
import { contentModel } from "./db/content";
import { tagModel } from "./db/tag";
import { linkModel } from "./db/link";
import { userModel } from "./db/user";
import { brainRouter } from "./routes/brain";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/brain", brainRouter);

(function () {
  connect(`${process.env.MONGO_URI}`).catch((err) => console.log(err));
})();

app.post("/api/v1/content", checkAuth, async (req, res) => {
  const contentSchema = z.object({
    type: z.enum(["tweet", "video", "document", "link"]),
    link: z.string(),
    title: z.string(),
    tags: z.array(z.string()),
  });

  try {
    const content = req.body;
    console.log(content);
    const isValidated = contentSchema.safeParse(content);
    if (!isValidated.success) {
      res
        .status(411)
        .json({ error: isValidated.error, msg: "Error in inputs" });
      return;
    }
    const { type, link, title, tags } = content;
    const user = await userModel.findOne({
      username: req.username,
    });
    if (!user) {
      res.status(403).json({ msg: "invalid user" });
      return;
    }

    await linkModel.create({ hash: link, userId: user._id });

    const tagIds = [];
    for (const tag of tags) {
      let tagData = await tagModel.findOne({ title: tag });
      if (!tagData) {
        tagData = await tagModel.create({ title: tag });
      }
      tagIds.push(tagData._id);
    }
    // console.log(tagIds);

    await contentModel.create({
      type,
      link,
      title,
      tags: tagIds,
      userId: user._id,
    });

    res.status(200).json({ msg: "content added" });

    return;
  } catch (err) {
    res.status(500).json({ msg: "server Error" });
  }
});

app.get("/api/v1/content", checkAuth, async (req, res) => {
  try {
    const user = await userModel.findOne({
      username: req.username,
    });
    if (!user) {
      res.status(403).json({ msg: "invalid user" });
      return;
    }
    const content = await contentModel
      .find({ userId: user._id })
      .populate("userId", "-password")
      .populate("tags");

    res.status(200).json(content);
    return;
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
});

app.get("/api/v1/tags", checkAuth, async (req, res) => {
  try {
    const allTags = await tagModel.find();

    res.status(200).json(allTags);
    return;
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
});

app.delete("/api/v1/content/:contentId", checkAuth, async (req, res) => {
  try {
    const content = await contentModel.findOne({
      _id: req.params.contentId,
    });
    if (content) {
      await contentModel.deleteOne({
        _id: req.params.contentId,
      });
      res.status(200).json({ msg: "content deleted sucessfully" });
      return;
    }
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server started");
});
