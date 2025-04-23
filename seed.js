import mongoose from "mongoose";
import db from "./db/connection.js";
import Event from "./models/event.js";
import User from "./models/user.js"
import "dotenv/config";


const seedEvents = async () => {
  try {
    await Event.deleteMany(); // Clear existing data

    const victoria = await User.findById("6809113bbe3c990d0cc3990d");
    const stella = await User.findById("68090cdc9be747d64c1763e3");
    const jon = await User.findById("68090e459be747d64c1763e7");

    const events = [
      {
        title: "Yoga",
        description: "Unwind with a gentle vinyasa flow.",
        date: new Date("04/01/2025"),
        city: "New York",
        creator: victoria.username,
      },
      {
        title: "Food Crawl",
        description: "Taste the best food around town with fellow foodies.",
        date: new Date("03/12/2025"),
        city: "New York",
        creator: stella.username,
      },
      {
        title: "Coding + Matcha Meetup",
        description: "Coworking and networking session.",
        date: new Date("03/22/2015"),
        city: "New York",
        creator: jon.username,
      }
    ];

    const createdEvents = await Event.insertMany(events);

    victoria.createdEvents.push(createdEvents[0]._id);
    await victoria.save();
    stella.createdEvents.push(createdEvents[1]._id);
    await stella.save();
    jon.createdEvents.push(createdEvents[2]._id);
    await jon.save();

    console.log("✨ Events successfully seeded!");
  } catch (error) {
    console.error("❌ Error seeding events:", error.message);
  } finally {
    db.close();
  }
};

seedEvents();
