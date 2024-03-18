// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/about" element={<About />} />

				<Route path="/projects" element={<Projects />} />
				<Route element={<PrivateRoute />}>
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>
			</Routes>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
