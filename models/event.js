import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  city: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
});


eventSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
  }
});

export default mongoose.model("Event", eventSchema);
