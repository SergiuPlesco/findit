import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";
import { LoginUser } from "../../redux/services/AuthenticationServices";
import { isLoggingValid } from "./FormValidation";

const Login = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [userToLog, setUserToLog] = useState({
		email: "",
		password: "",
	});
	const [loggingError, setLoggingError] = useState(null);

	const handleForm = (e) => {
		e.preventDefault();
		setUserToLog({
			...userToLog,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const { error } = isLoggingValid(userToLog);
		if (error) {
			setLoggingError(error.toString().replace("ValidationError: ", ""));
			setTimeout(() => {
				setLoggingError(null);
			}, 3000);
			return;
		}
		dispatch(LoginUser(userToLog))
			.then((result) => {
				console.log(result);
				if (result.error) {
					throw Error(result.payload.toString());
				}
				const token = result.payload.token;
				if (!token) {
					throw Error("Server error. Try again.");
				}

				localStorage.setItem("authToken", token);
				localStorage.setItem("isUserLoggedIn", "loggedIn");
				history.push(`/users/${result.payload.id}`);
			})
			.catch((error) => {
				setLoggingError(error.message);
				setTimeout(() => {
					setLoggingError(null);
				}, 3000);
			});
	};

	return (
		<div className="form-container">
			<form className="form">
				{loggingError && <p style={{ color: "red", marginBottom: "1rem" }}>{loggingError}</p>}
				<div>
					<label htmlFor="email" className="form-label">
						Email:
					</label>
					<input
						id="email"
						type="text"
						className="form-control"
						placeholder="name@example.com"
						value={userToLog.email}
						onChange={handleForm}
					/>
					<label htmlFor="password" className="form-label">
						Password:
					</label>
					<input
						id="password"
						type="text"
						className="form-control"
						placeholder="Password"
						value={userToLog.password}
						onChange={handleForm}
					/>

					<button type="submit" className="form-button" onClick={handleSubmit}>
						Log in
					</button>
					<div>
						<Link className="form-link" to="/users/register">
							Register
						</Link>
						<Link className="form-link" to="/users/forgotpassword">
							Forgot Password
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;
