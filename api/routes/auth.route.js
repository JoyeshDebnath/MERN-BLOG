import express from "express";
import {
	signup,
	signin,
	signInWithGoogle,
} from "../controllers/auth.controller.js";
const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/google", signInWithGoogle);
export default authRouter;
