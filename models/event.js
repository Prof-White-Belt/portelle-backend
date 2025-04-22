import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String, required: true },
  city: { type: String, required: true },
  creator: { type: String, required: true },
});


eventSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
  }
});

export default mongoose.model("events", eventSchema);
