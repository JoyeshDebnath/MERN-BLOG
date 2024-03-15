import React from "react";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
const OAuth = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const auth = getAuth(app);
	const handleGoogleClick = async () => {
		const provider = new GoogleAuthProvider();
		provider.setCustomParameters({ prompt: "select_account" });

		try {
			const resultFromGoogle = await signInWithPopup(auth, provider);
			const res = await fetch("/api/v1/auth/google", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: resultFromGoogle.user.displayName,
					email: resultFromGoogle.user.email,
					googlePhoto: resultFromGoogle.user.photoURL,
				}),
			});

			const data = await res.json();
			if (res.ok) {
				dispatch(signInSuccess(data));
				navigate("/");
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<Button
			type="button"
			gradientDuoTone="pinkToOrange"
			outline
			onClick={handleGoogleClick}
		>
			<AiFillGoogleCircle className="w-6 h-6 mr-2" />
			Continue With Google
		</Button>
	);
};

export default OAuth;
