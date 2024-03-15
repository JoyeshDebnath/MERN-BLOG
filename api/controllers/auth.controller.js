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

export const signInWithGoogle = async (req, res, next) => {
	const { email, googlePhoto, name } = req.body;
	if (!email || !name || email === "" || name === "") {
		next(errorHandler(400, "name and email are required !"));
	}
	try {
		const user = await User.findOne({
			email: email,
		});
		if (user) {
			//if the user exists sign in the user...
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
			const { password: pass, ...rest } = user._doc;
			res
				.status(200)
				.cookie("access_token", token, {
					httpOnly: true,
				})
				.json(rest);
		} else {
			const generateRandomPassword =
				Math.random().toString(36).slice(-8) +
				Math.random().toString(36).slice(-8);
			const hashedPassword = bcryptJs.hashSync(generateRandomPassword, 10);
			const newUser = new User({
				username:
					name.toLowerCase().split(" ").join("") +
					Math.random().toString(9).slice(-4),
				email: email,
				password: hashedPassword,
				profilePicture: googlePhoto,
			});
			//add new user in db
			await newUser.save();
			res.json({
				message: "success",
			});
			//create a token after inserting the new user in db
			const token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
			//sign in the new user
			const { password: pass, ...rest } = newUser._doc;
			res
				.status(200)
				.cookie("access_token", token, {
					httpOnly: true,
				})
				.json(rest);
		}
	} catch (err) {
		next(err);
	}
};
