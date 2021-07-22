import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { RegisterUser } from "../../redux/services/AuthenticationServices";
import { isRegistrationValid } from "./FormValidation";

const Register = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [user, setUser] = useState({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		repeat_password: "",
	});

	const [validationError, setValidationError] = useState();

	const handleForm = (e) => {
		e.preventDefault();
		setUser({
			...user,
			[e.target.id]: e.target.value,
		});
	};

	const submitForm = (e) => {
		e.preventDefault();
		const { error, value } = isRegistrationValid(user);

		if (error) {
			setValidationError(error.toString().replace("ValidationError: ", ""));
			return;
		}
		// remove repeat_password key from user object
		const { repeat_password, ...newUser } = user;

		dispatch(RegisterUser(newUser))
			.then((result) => {
				if (result.error) {
					throw Error(result.payload);
				}
				history.push("/users/login");
			})
			.catch((error) => setValidationError(error.toString()));
	};

	return (
		<div className="form-container">
			<form className="form">
				{validationError && <p style={{ color: "red", marginBottom: "1rem" }}>{validationError}</p>}
				<div>
					<label htmlFor="firstname" className="form-label">
						First Name:
					</label>
					<input
						id="firstname"
						type="text"
						className="form-control"
						placeholder="John/Jane"
						value={user.firstname}
						onChange={handleForm}
					/>
					<label htmlFor="lastname" className="form-label">
						Last Name:
					</label>
					<input
						id="lastname"
						type="text"
						className="form-control"
						placeholder="Smith"
						value={user.lastname}
						onChange={handleForm}
					/>
					<label htmlFor="email" className="form-label">
						Email:
					</label>
					<input
						id="email"
						type="text"
						className="form-control"
						placeholder="Email"
						value={user.email}
						onChange={handleForm}
					/>
					<label htmlFor="password" className="form-label">
						Password:
					</label>
					<input
						id="password"
						type="text" // password?
						className="form-control"
						placeholder="Password"
						value={user.password}
						onChange={handleForm}
					/>
					<label htmlFor="confirmpassword" className="form-label">
						Repeat Password:
					</label>
					<input
						id="repeat_password"
						type="text" // password?
						className="form-control"
						placeholder="Repeat Password"
						value={user.repeat_password}
						onChange={handleForm}
					/>
					<button type="submit" className="form-button" onClick={submitForm}>
						Register
					</button>
				</div>
			</form>
		</div>
	);
};

export default Register;
