import React from "react";
import { Link } from "react-router-dom";
import { Label, TextInput, Button } from "flowbite-react";
const SignUp = () => {
	return (
		<div className="min-h-screen mt-20">
			<div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
				<div className="flex-1">
					{/* left */}
					<Link
						to="/"
						className="text-sm sm:text-xl font-bold dark:text-white text-4xl"
					>
						<span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
							Joyesh's
						</span>
						Blog
					</Link>
					<p className="text-sm mt-5">
						This is Joyesh Blog . Find out awsome articles ..
					</p>
				</div>
				<div className="flex-1">
					{/* right */}
					<div className="">
						<form className="flex flex-col gap-4">
							<div className="">
								<Label value="Enter Username"></Label>
								<TextInput
									type="text"
									placeholder="John Doe"
									className=""
									id="username"
								/>
							</div>
							<div className="">
								<Label value="Enter Email"></Label>
								<TextInput
									type="text"
									placeholder="example@yahoo.com"
									className=""
									id="email"
								/>
							</div>
							<div className="">
								<Label value="Enter Password"></Label>
								<TextInput
									type="text"
									placeholder="XXXXXXX"
									className=""
									id="password"
								/>
							</div>
							<Button gradientDuoTone="purpleToPink" type="submit">
								Sign Up
							</Button>
						</form>
						<div className=" mt-5 flex gap-3 text-sm">
							<span>Have an Account ?</span>
							<Link to="sign-in" className="text-blue-500">
								Sign In
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
