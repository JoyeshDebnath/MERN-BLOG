import User from "../models/User.js";
import bcryptJs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
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

export const signin = async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password || email === "" || password === "") {
		next(errorHandler(400, "Username and password Are Required !"));
	}

	try {
		const validUser = await User.findOne({
			email: email,
		});
		if (!validUser) {
			next(errorHandler(400, "User not found !"));
		}
		const validPassword = bcryptJs.compareSync(password, validUser.password);
		if (!validPassword) {
			next(errorHandler(400, "Password is not valid !"));
		}
		const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
		//response of the user data excluding the password
		const { password: pass, ...rest } = validUser._doc;
		res
			.status(200)
			.cookie("access_token", token, {
				httpOnly: true,
			})
			.json(rest);
	} catch (err) {
		next(err);
	}
};
