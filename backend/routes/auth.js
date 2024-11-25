import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { ethers } from "ethers";
import User from "../models/user.js";

const router = express.Router();

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);
    res.redirect(`/auth/success?token=${token}`);
  }
);

// MetaMask authentication
router.post("/metamask", async (req, res) => {
  try {
    const { address, signature, message } = req.body;

    // Verify the signature
    const recoveredAddress = ethers.utils.verifyMessage(message, signature);

    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    let user = await User.findOne({ ethAddress: address });

    if (!user) {
      user = await User.create({
        ethAddress: address,
        name: `User ${address.slice(0, 6)}`,
        email: `${address.slice(0, 6)}@eth.user`,
        description: "",
        title: "",
        avatar: "",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get current user
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
