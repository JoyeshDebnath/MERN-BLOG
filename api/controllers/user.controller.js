import User from "../models/User.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
export const test = (req, res) => {
	res.json({
		message: "API testing ....",
	});
};

export const updateUser = async (req, res, next) => {
	console.log(req.user);
	if (req.params.userId != req.user.id) {
		return next(errorHandler(403, "You are not allowed To update this user !"));
	}
	//check for errors in password
	if (req.body.password) {
		if (req.body.password.length < 6) {
			return next(
				errorHandler(400, "Password Must be at least 6 characters !")
			);
		}
		req.body.password = bcryptjs.hashSync(req.body.password, 10); //hash the password if there is a password in  request body ..
	}
	//check for the errors in username : no space in between AND character limitations
	if (req.body.username) {
		if (req.body.username.length < 7 || req.body.username.length > 20) {
			return next(
				errorHandler(400, "Username Must be between 7 to 20 Characters !")
			);
		} else if (req.body.username.includes(" ")) {
			return next(errorHandler(400, "Username Cannnot Contain Spaces !"));
		} else if (req.body.username !== req.body.username.toLowerCase()) {
			return next(errorHandler(400, "Username must be in lowercase !"));
		} else if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
			return next(
				errorHandler(400, "username must not contain any special characters !")
			);
		}
	}

	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.userId,
			{
				$set: {
					username: req.body.username,
					email: req.body.email,
					password: req.body.password,
					profilePicture: req.body.profilePicture,
				},
			},
			{
				new: true,
			}
		);

		const { password, ...rest } = updatedUser._doc;
		res.status(200).json(rest);
	} catch (err) {
		next(err);
	}
};
//delete user
export const deleteUser = async (req, res, next) => {
	if (req.user.id !== req.params.userId) {
		return next(errorHandler(403, "You are not allowed to Delete this user!"));
	}
	try {
		await User.findByIdAndDelete(req.params.userId);
		res.status(200).json("User Has Been Deleted !");
	} catch (err) {
		next(err);
	}
};
