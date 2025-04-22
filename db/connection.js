import mongoose from "mongoose";
import "dotenv/config";

mongoose.set("returnOriginal", false);

mongoose.connect(process.env.MONGODB_URI).catch((err) => {
    console.log(`Error connection to MongoDB: ${err.message}`)
})

mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from DB");
} )

mongoose.connection.on("error", (err) => {
    console.log("MongoDB contains error: " + err);

})

export default mongoose.connection;