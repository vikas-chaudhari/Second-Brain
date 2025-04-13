import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { isValid } from "zod";
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1] || "";
  try {
    const isVerified = jwt.verify(token, `${process.env.USER_JWT_SECRET}`);
    if (typeof isVerified === "object") {
      req.username = isVerified.username;
    }
    if (!isVerified) {
      res.status(401).json({ msg: "Unauthorized User" });
      return;
    }
    next();
  } catch (err) {
    res.status(401).json({ msg: "Unauthorized User" });
    return;
  }
};
