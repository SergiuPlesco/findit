import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { userStatus } from "../../redux/slices/AuthSlice";

const PrivateRoute = ({ children, ...rest }) => {
	const isLoggedIn = useSelector(userStatus);

	return <Route {...rest}>{isLoggedIn ? children : <Redirect to="/users/login" />}</Route>;
};

export default PrivateRoute;
