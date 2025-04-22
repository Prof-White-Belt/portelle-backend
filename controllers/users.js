import "dotenv/config";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "username");

    res.json(users);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    if (req.user._id !== req.params.userId) {
      return res.status(403).json({ err: "Unauthorized" });
    }

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ err: "User not found." });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const signUp = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });

    if (userInDatabase) {
      return res.status(409).json({ err: "Username already taken." });
    }

    const user = await User.create({
      username: req.body.username,
      hashedPassword: bcrypt.hashSync(
        req.body.password,
        Number(process.env.SALT_ROUNDS)
      ),
    });

    const payload = { username: user.username, _id: user._id };

    const token = jwt.sign({ payload }, process.env.JWT_SECRET);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ err: "Invalid credentials." });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.hashedPassword
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ err: "Invalid credentials." });
    }

    // Construct the payload
    const payload = { username: user.username, _id: user._id };

    // Create the token, attaching the payload
    const token = jwt.sign({ payload }, process.env.JWT_SECRET);

    // Send the token instead of the message
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
