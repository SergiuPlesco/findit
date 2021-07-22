import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
	return (
		<div className="form-container">
			<form className="form">
				<div>
					<label htmlFor="email" className="form-label">
						Email:
					</label>
					<input id="email" type="text" className="form-control" placeholder="name@example.com" />
					<label htmlFor="password" className="form-label">
						Password:
					</label>
					<input id="password" type="text" className="form-control" placeholder="Password" />

					<button type="submit" className="form-button">
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
