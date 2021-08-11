import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Components
import Header from "./components/partials/header/Header";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import ForgotPassword from "./components/login/ForgotPassword";
import ResetPasswpord from "./components/login/ResetPassword";
import CompanyDetails from "./components/CompanyDetails";
import PageNotFound from "./components/pages/PageNotFound";
import CompaniesByCategory from "./components/CompaniesByCategory";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import Footer from "./components/partials/footer/Footer";
import Home from "./components/pages/Home";

function App() {
	// default location
	if (!localStorage.getItem("city")) {
		localStorage.setItem("city", "London");
	}
	return (
		<Router>
			<Header />
			<div className="container">
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
					<PrivateRoute exact path="/users/:userID/">
						<Dashboard />
					</PrivateRoute>

					<Route path="*">
						<PageNotFound />
					</Route>
				</Switch>
			</div>
			<Footer />
		</Router>
	);
}

export default App;
