import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
const SignIn = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({});
	const [errorMessage, setErrorMessage] = useState(null);
	const [loading, setLoading] = useState(false);
	//handle change
	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.id]: event.target.value.trim() });
	};
	console.log(formData);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!formData.email || !formData.password) {
			return setErrorMessage("Please Fill up all the details !");
		}
		try {
			setLoading(true);
			setErrorMessage(null);
			const res = await fetch("api/v1/auth/signin", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			setLoading(false);
			console.log(data);
			if (data.success === false) {
				return estErrorMessage(data.message);
			}
			if (res.ok) {
				navigate("/");
			}
		} catch (err) {
			setLoading(false);
			setErrorMessage(err.message);
		}
	};
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
						You can Sign in with Your email and password or with Google
					</p>
				</div>
				<div className="flex-1">
					{/* right */}
					<div className="">
						<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
							<div className="">
								<Label value="Enter Email"></Label>
								<TextInput
									type="email"
									placeholder="example@yahoo.com"
									className=""
									id="email"
									onChange={handleChange}
								/>
							</div>
							<div className="">
								<Label value="Enter Password"></Label>
								<TextInput
									type="password"
									placeholder="XXXXXXX"
									className=""
									id="password"
									onChange={handleChange}
								/>
							</div>
							<Button
								gradientDuoTone="purpleToPink"
								type="submit"
								disabled={loading}
							>
								{loading ? (
									<Spinner size="sm">
										<span className="pl-3">Loading ....</span>
									</Spinner>
								) : (
									"Sign IN"
								)}
							</Button>
						</form>
						<div className=" mt-5 flex gap-3 text-sm">
							<span>Dont Have an Account ?</span>
							<Link to="/sign-up" className="text-blue-500">
								Sign Up
							</Link>
						</div>
						{errorMessage && (
							<div className="mt-5">
								<Alert color="failure">{errorMessage}</Alert>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
