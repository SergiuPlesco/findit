import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Components
import Header from "./components/partials/header/Header";
import SearchBar from "./components/SearchBar";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import ForgotPassword from "./components/login/ForgotPassword";
import ResetPasswpord from "./components/login/ResetPassword";
import Home from "./components/pages/Home";
import PageNotFound from "./components/pages/PageNotFound";

function App() {
	return (
		<Router>
			<div className="container">
				<Header />
				{/* <SearchBar /> */}

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
					<Route path="*">
						<PageNotFound />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
