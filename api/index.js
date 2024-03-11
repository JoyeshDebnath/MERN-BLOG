import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();
const app = express();
app.use(express.json());
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("DB connected "))
	.catch((err) => {
		console.log("Something went wrong !");
	});

app.listen(3000, () => {
	console.log("Server on running on 3000");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);
