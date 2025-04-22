import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  // city: {type: String, required: true},
  hashedPassword: { type: String, required: true },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

export default mongoose.model("users", userSchema);