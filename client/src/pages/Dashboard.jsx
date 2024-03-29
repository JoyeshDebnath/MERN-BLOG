import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

const Dashboard = () => {
	const location = useLocation();
	const [tab, setTab] = useState("");
	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const tabFromUrl = urlParams.get("tab");
		// console.log(tabFromUrl);
		if (tabFromUrl) {
			setTab(tabFromUrl);
		}
	}, [location.search]);
	return (
		<div className="min-h-screen flex flex-col md:flex-row">
			<div className="md:w-56">
				{/* Side bar */}
				<DashSidebar />
			</div>
			{/* <div> */}
			{/* profile section  */}
			{tab === "profile" && <DashProfile />}
			{/* </div> */}
		</div>
	);
};

export default Dashboard;
