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
        description: "Unwind with a gentle vinyasa flow overlooking the city skyline.",
        date: new Date("2025-04-25T18:00:00"),
        location: "123 Skyview Ave, New York, NY",
        city: "New York",
        creator: sampleUserId,
        attendees: []
      },
      {
        title: "Food Crawl",
        description: "Taste the best plant-based bites around town with fellow foodies.",
        date: new Date("2025-04-28T14:00:00"),
        location: "456 Greenway Blvd, Brooklyn, NY",
        city: "New York",
        creator: sampleUserId,
        attendees: []
      },
      {
        title: "Coding + Matcha Meetup",
        description: "Bring your laptop and love for matcha. Coworking and networking session.",
        date: new Date("2025-05-02T10:00:00"),
        location: "22 Java St, Brooklyn, NY",
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
