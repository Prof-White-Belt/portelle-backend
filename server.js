import db from "./db/connection.js";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js"

const app = express();
const PORT = process.env.porrt || 3000;

app.use(cors());
app.use(express.json());

app.use("/", routes);

db.on("connected", () => {
    console.clear();
    console.log("Connected to MongoDB");
})

app.listen(PORT, () => {
    console.log("Express server running on port" + PORT);
})