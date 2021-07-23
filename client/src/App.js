import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

//Components
import Header from "./components/partials/header/Header";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import ForgotPassword from "./components/login/ForgotPassword";
import ResetPasswpord from "./components/login/ResetPassword";
import CompanyDetails from "./components/CompanyDetails";
import Home from "./components/pages/Home";
import PageNotFound from "./components/pages/PageNotFound";
import { getBrandsAndCatByCity } from "./redux/services/PublicServices";
import CompaniesByCategory from "./components/CompaniesByCategory";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { userStatus } from "./redux/slices/AuthSlice";

function App() {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector(userStatus);
	const city = localStorage.getItem("city");
	useEffect(() => {
		if (city) {
			dispatch(getBrandsAndCatByCity(city));
		}
	}, [city, dispatch]);

	return (
		<Router>
			<div className="container">
				<Header />

				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/users/login">
						<Login />
					</Route>
					<Route exact path="/users/register">
						<Register />
					</Route>
					<Route exact path="/users/forgotpassword">
						<ForgotPassword />
					</Route>
					<Route exact path="/users/resetpassword/:resetToken">
						<ResetPasswpord />
					</Route>
					<Route exact path="/:city/brand/:brand">
						<CompanyDetails />
					</Route>
					<Route exact path="/:city/category/:category">
						<CompaniesByCategory />
					</Route>
					<PrivateRoute exact path="/users/:userID/company">
						<Dashboard />
					</PrivateRoute>

					<Route path="*">
						<PageNotFound />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
