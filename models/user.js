import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  city: { type: String, required: true },
  interestedEvents: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "events" 
  }]
});

const User = mongoose.model("User", userSchema);

export default User;