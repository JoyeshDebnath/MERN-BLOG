import User from "../models/User.js";
import bcryptJs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
	const body = req.body;
	const { username, email, password } = req.body;
	if (
		!username ||
		!email ||
		!password ||
		email === "" ||
		password === "" ||
		username === ""
	) {
		next(errorHandler(400, "All Fields Are Required!"));
	}

	const hashedPassword = bcryptJs.hashSync(password, 10);

	const newUser = new User({
		username,
		email,
		password: hashedPassword,
	});
	try {
		await newUser.save();
		res.json({ message: "success" });
	} catch (err) {
		next(err);
	}
};
