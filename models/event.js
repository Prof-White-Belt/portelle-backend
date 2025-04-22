import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String, required: true },
  location: { type: String, required: true },
  city: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
}, {
  timestamps: true
});


eventSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
  }
});

export default mongoose.model("events", eventSchema);
