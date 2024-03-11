import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("DB connected "))
	.catch((err) => {
		console.log("Something went wrong !");
	});
const app = express();

app.listen(3000, () => {
	console.log("Server on running on 3000");
});
