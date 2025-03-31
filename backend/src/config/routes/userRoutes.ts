import express, { Request, Response } from "express";
import User from "../models/User";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

interface AuthRequest extends Request {
  user?: string;
}

router.get("/profile", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

export default router;
