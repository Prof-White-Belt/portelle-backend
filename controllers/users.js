import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const getUsers = async (req, res) => {
  try {
    console.log("Fetching all users...");
    const users = await User.find({}, "username");
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ err: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ err: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ err: err.message });
  }
};

export const signUp = async (req, res) => {
  try {
    console.log("Sign-up attempt for:", req.body.username);
    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      console.log("Username already taken");
      return res.status(409).json({ err: "Username already taken." });
    }

    const user = await User.create({
      username: req.body.username,
      city: req.body.city,
      hashedPassword: bcrypt.hashSync(req.body.password, Number(process.env.SALT_ROUNDS)),
    });

    const payload = { username: user.username, _id: user._id, city: user.city };
    const token = jwt.sign({ payload }, process.env.JWT_SECRET);

    res.status(201).json({ token });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ error: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login attempt for username:", username);

    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found:", username);
      return res.status(401).json({ err: "Invalid credentials." });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.hashedPassword);
    console.log("Password match:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      return res.status(401).json({ err: "Invalid credentials." });
    }

    const payload = { username: user.username, _id: user._id, city: user.city };
    const token = jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("Generated JWT token:", token);

    res.status(200).json({ token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ err: err.message });
  }
};

export const interestedEvent = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const interestedEvent = await Event.findById(req.params.eventId);

    if (!interestedEvent) {
      return res.status(404).json({ error: "Event not found." });
    }

    user.createdEvents.forEach((event) => {
      if (event.toString() === req.params.eventId) {
        throw new Error("Cannot add an event you have created.");
      }
    });

    user.interestedEvents.forEach((event) => {
      if (event.toString() === req.params.eventId) {
        throw new Error("Already added this event.");
      }
    });

    user.interestedEvents.push(interestedEvent._id);
    await user.save();

    res.status(200).json({ interestedEvent: interestedEvent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};