import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  city: {type: String, required: true},
  hashedPassword: { type: String, required: true },
  createdEvents: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Event" }],
  interestedEvents: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Event" 
    } ]
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

export default mongoose.model("users", userSchema);