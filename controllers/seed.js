import mongoose from "mongoose";
import db from "./connection.js";
import Event from "../models/event.js";
import "dotenv/config";

// Optional: Replace with actual user IDs from your DB
const sampleUserId = new mongoose.Types.ObjectId();

const seedEvents = async () => {
  try {
    await Event.deleteMany(); // Clear existing data

    const events = [
      {
        title: "Yoga",
        description: "Unwind with a gentle vinyasa flow.",
        date: new Date("04/01/2025"),
        city: "New York",
        creator: sampleUserId,
        attendees: []
      },
      {
        title: "Food Crawl",
        description: "Taste the best food around town with fellow foodies.",
        date: new Date("03/12/2025"),
        city: "New York",
        creator: sampleUserId,
        attendees: []
      },
      {
        title: "Coding + Matcha Meetup",
        description: "Coworking and networking session.",
        date: new Date("03/22/2015"),
        city: "New York",
        creator: sampleUserId,
        attendees: []
      }
    ];

    await Event.insertMany(events);
    console.log("✨ Events successfully seeded!");
  } catch (error) {
    console.error("❌ Error seeding events:", error.message);
  } finally {
    db.close();
  }
};

seedEvents();
