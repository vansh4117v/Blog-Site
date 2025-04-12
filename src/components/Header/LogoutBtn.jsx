import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";

const LogoutBtn = () => {
	const dispatch = useDispatch();
	const logoutHandles = () => {
		authService.logout().then(() => {
			dispatch(logout());
		});
	};
	return (
		<div
			className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
			onClick={logoutHandles}
		>
			Logout
		</div>
	);
};

export default LogoutBtn;
