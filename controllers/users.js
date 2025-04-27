import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Event from "../models/event.js";

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

export const showUserEvents = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: "interestedEvents",             // ✅ This populates the events properly
        populate: { 
          path: "creator",                    // ✅ This matches your Event schema (creator is ref: "users")
          select: "username _id"
        }
      });

    const userCreatedEvents = await Event.find({ creator: req.user._id });

    res.json({ 
      user: { 
        interestedEvents: user.interestedEvents 
      }, 
      userCreatedEvents 
    });
  } catch (error) {
    console.error("Error fetching user events:", error);
    res.status(500).json({ err: error.message });
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
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }

    const isInterested = user.interestedEvents.some(
      (e) => e.toString() === req.params.eventId
    );

    if (isInterested) {
      user.interestedEvents = user.interestedEvents.filter(
        (e) => e.toString() !== req.params.eventId
      );
      await user.save();
      return res.status(200).json({ message: "Removed from interested events." });
    } else {
      user.interestedEvents.push(event._id);
      await user.save();
      return res.status(200).json({ message: "Added to interested events." });
    }
  } catch (error) {
    console.error("Error toggling interested event:", error);
    res.status(500).json({ error: error.message });
  }
};