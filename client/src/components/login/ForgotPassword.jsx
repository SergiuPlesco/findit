import { useState } from "react";
import axios from "axios";
import { isEmailValid } from "./FormValidation";

const ForgotPassword = () => {
	const [userEmail, setUserEmail] = useState({
		email: "",
	});
	const [success, setSuccess] = useState("");
	const [emailError, setEmailError] = useState(null);
	const handleForm = (e) => {
		e.preventDefault();
		setUserEmail({
			...userEmail,
			[e.target.id]: e.target.value,
		});
	};
	const submitForm = async (e) => {
		e.preventDefault();
		const { error } = isEmailValid(userEmail);
		if (error) {
			setEmailError(error.toString().replace("ValidationError: ", ""));
			setTimeout(() => {
				setEmailError(null);
			}, 3000);
			return;
		}

		try {
			const { data } = await axios.post("/users/forgotpassword", userEmail);
			console.log(data);
			setSuccess(data.message);
			setTimeout(() => {
				setSuccess("");
				setUserEmail({
					email: "",
				});
			}, 3000);
		} catch (error) {
			setEmailError(error.response.data.error);
			setTimeout(() => {
				setEmailError(null);
				setUserEmail({
					email: "",
				});
			}, 3000);
		}
	};
	return (
		<div className="form-container">
			<form className="form">
				{emailError && <p style={{ color: "red", marginBottom: "1rem" }}>{emailError}</p>}
				{success && <p style={{ color: "green", marginBottom: "1rem" }}>{success}</p>}

				<div>
					<label htmlFor="email" className="form-label">
						Email:
					</label>
					<input
						id="email"
						type="email"
						className="form-control"
						placeholder="name@example.com"
						value={userEmail.email}
						onChange={handleForm}
					/>

					<button type="submit" className="form-button" onClick={submitForm}>
						Send email
					</button>
				</div>
			</form>
		</div>
	);
};

export default ForgotPassword;
