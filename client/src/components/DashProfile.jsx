import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextInput, Button, Alert } from "flowbite-react";
import {
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
} from "../redux/user/userSlice";

import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const DashProfile = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [file, setFile] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);
	const [imageFileUploadingProgress, setImageFileUploadingProgress] =
		useState(null);
	const [imageFileUploading, setImageFileUploading] = useState(false);
	const [imageFileUploadError, setImageFileUploadError] = useState(null);
	const [formData, setFormData] = useState({});
	const [userUpdateSuccess, setUserUpdateSuccess] = useState(null);
	const [userUpdateError, setUserUpdateError] = useState(null);
	const filePickerRef = useRef();
	const dispatch = useDispatch();

	// console.log(imageFileUploadingProgress, imageFileUploadError);
	const handleFileChange = (event) => {
		const img = event.target.files[0];
		if (img) {
			setFile(img);
			setImageUrl(URL.createObjectURL(img));
		}
	};

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.id]: event.target.value });
	};

	// console.log("FormData : ", formData);
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setUserUpdateError(null);
		setUserUpdateSuccess(null);
		console.log(formData);
		if (Object.keys(formData).length === 0) {
			setUserUpdateError("No Changes Made!");
			setImageFileUploadingProgress(null);
			return;
		}

		try {
			dispatch(updateUserStart());
			const response = await fetch(`/api/v1/user/update/${currentUser._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();
			if (!response.ok) {
				setUserUpdateError(data.message); //error to shgow in alert
				dispatch(updateUserFailure(data.message));
				setImageFileUploadingProgress(null);
			} else {
				dispatch(updateUserSuccess(data));
				setUserUpdateSuccess("Users Profile Updated !");
				setImageFileUploadingProgress(null);
			}
		} catch (err) {
			setUserUpdateError(err.message);
			updateUserFailure(err.message);
			setImageFileUploadingProgress(null);
		}
	};

	useEffect(() => {
		if (file) {
			setImageFileUploadError(null);
			setUserUpdateError(null);
			setUserUpdateSuccess(null);
			uploadImage();
		}
	}, [file]);

	const uploadImage = async () => {
		setImageFileUploading(true);
		const storage = getStorage(app);
		const fileName = new Date().getTime() + file.name;
		const storageRef = ref(storage, fileName);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				// progress =10.63863
				setImageFileUploadingProgress(progress.toFixed(0));
			},
			(error) => {
				setImageFileUploadError(
					"Couldnt Upload Image : File Must be less than 2 megabytes  "
				);
				setImageFileUploadingProgress(null);
				setImageUrl(null);
				setFile(null);
				setImageFileUploading(false);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
					setImageUrl(downloadUrl);
					setFormData({ ...formData, profilePicture: downloadUrl });
					setImageFileUploading(false);
				});
			}
		);
	};

	return (
		<div className=" max-w-lg mx-auto p-3 w-full">
			<h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
			<form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
				<input
					type="file"
					accept="image/*"
					onChange={handleFileChange}
					ref={filePickerRef}
					hidden
				/>

				<div
					className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
					onClick={() => filePickerRef.current.click()}
				>
					{imageFileUploadingProgress && (
						<CircularProgressbar
							value={imageFileUploadingProgress || 0}
							text={`${imageFileUploadingProgress}%`}
							strokeWidth={5}
							styles={{
								root: {
									width: "100%",
									height: "100%",
									position: "absolute",
									top: 0,
									left: 0,
								},
								path: {
									stroke: `rgba(62, 152, 199, ${
										imageFileUploadingProgress / 100
									})`,
								},
							}}
						/>
					)}
					<img
						className="w-full h-full rounded-full border-8 object-cover "
						src={imageUrl || currentUser.profilePicture}
						alt="Profile Img"
					/>
				</div>
				{imageFileUploadError && (
					<Alert color="failure">{imageFileUploadError}</Alert>
				)}

				<TextInput
					id="username"
					placeholder="user name"
					type="text"
					defaultValue={currentUser.username}
					onChange={handleChange}
				/>
				<TextInput
					id="email"
					placeholder="user email"
					type="email"
					defaultValue={currentUser.email}
					onChange={handleChange}
				/>
				<TextInput
					type="password"
					id="password"
					defaultValue="**************"
					onChange={handleChange}
				/>
				<Button
					type="submit"
					gradientDuoTone="purpleToBlue"
					outline
					disabled={imageFileUploading}
				>
					Update
				</Button>
			</form>
			<div className="text-red-500 flex justify-between mt-5">
				<span className="cursor-pointer">Delete Account</span>
				<span className="cursor-pointer">Sign Out</span>
			</div>
			{userUpdateSuccess && (
				<Alert className="mt-5" color="success">
					{userUpdateSuccess}
				</Alert>
			)}
			{userUpdateError && (
				<Alert className="mt-5" color="failure">
					{userUpdateError}
				</Alert>
			)}
		</div>
	);
};

export default DashProfile;
