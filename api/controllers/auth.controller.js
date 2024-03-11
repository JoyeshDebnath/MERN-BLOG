import User from "../models/User.js";
import bcryptJs from "bcryptjs";

export const signup = async (req, res) => {
	const body = req.body;
	const { username, email, password } = req?.body;
	if (
		!username ||
		!email ||
		!password ||
		email === "" ||
		password === "" ||
		username === ""
	) {
		return res.status(400).json({
			message: "All Fields are required !",
		});
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
		res.json({
			status: "Error",
			message: err.message,
		});
	}
};
