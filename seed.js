import db from "./db/connection.js";
import Event from "./models/event.js";
import User from "./models/user.js"
import bcrypt from "bcrypt";
import "dotenv/config";


const seedEvents = async () => {
  try {
    await Event.deleteMany(); // Clear existing data
    await User.deleteMany();

    const victoria = await User.create({
      username: "Victoria",
      city: "NYC",
      hashedPassword: bcrypt.hashSync(
        "victoria",
        Number(process.env.SALT_ROUNDS),
      ),
      interestedEvents: []
    });

    const events = [
      {
        title: "Yoga",
        description: "Unwind with a gentle vinyasa flow.",
        date: new Date("04/01/2025"),
        city: "New York",
        creator: victoria,
      },
      {
        title: "Food Crawl",
        description: "Taste the best food around town with fellow foodies.",
        date: new Date("03/12/2025"),
        city: "New York",
        creator: victoria,
      },
      {
        title: "Coding + Matcha Meetup",
        description: "Coworking and networking session.",
        date: new Date("03/22/2015"),
        city: "New York",
        creator: victoria,
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
