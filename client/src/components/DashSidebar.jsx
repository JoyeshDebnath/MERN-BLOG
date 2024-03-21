import { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { useLocation, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import {
	signOutStart,
	signOutSuccess,
	signOutFailure,
} from "../redux/user/userSlice.js";
const DashSidebar = () => {
	const { currentUser } = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const location = useLocation();
	const [tab, setTab] = useState("");
	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const tabFromUrl = urlParams.get("tab");
		if (tabFromUrl) {
			setTab(tabFromUrl);
		}
	}, [location.search]);

	const signOutHandler = async () => {
		try {
			dispatch(signOutStart());

			const response = await fetch(`/api/v1/user/signout/${currentUser._id}`, {
				method: "POST",
			});
			const data = await response.json();
			if (!response.ok) {
				dispatch(signOutFailure(data.message));
			} else dispatch(signOutSuccess());
		} catch (err) {
			dispatch(signOutFailure(err.message));
		}
	};

	return (
		<Sidebar className="w-full md:w-56">
			<Sidebar.Items>
				<Sidebar.ItemGroup>
					<Link to="/dashboard?tab=profile">
						<Sidebar.Item
							active={tab === "profile"}
							icon={HiUser}
							label={"User"}
							labelColor="dark"
							as="div"
						>
							Profile
						</Sidebar.Item>
					</Link>
					<Sidebar.Item
						icon={HiArrowSmRight}
						className="cursor-pointer"
						onClick={signOutHandler}
					>
						Sign Out
					</Sidebar.Item>
				</Sidebar.ItemGroup>
			</Sidebar.Items>
		</Sidebar>
	);
};

export default DashSidebar;
