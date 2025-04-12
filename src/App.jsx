import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		authService
			.getCurrentUser()
			.then((userData) => {
				if (userData) {
					dispatch(login({ userData }));
				} else {
					dispatch(logout());
				}
			})
			.finally(() => setLoading(false));
	}, []);

	return !loading ? (
		<div className="min-h-screen flex flex-col bg-gray-400 w-full">
			<Header />
			<main className="flex-1">
				<Outlet />
			</main>
			<div className="text-center py-4">Made by vansh4117v</div>
		</div>
	) : null;
}

export default App;
