import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { isNewPasswordValid } from "./FormValidation";
import axios from "axios";

const ResetPassword = () => {
	const history = useHistory();
	const params = useParams();
	const [success, setSuccess] = useState("");
	const [error, setError] = useState(null);
	const [newPassword, setNewPassword] = useState({
		new_password: "",
		repeat_new_password: "",
	});

	const handleForm = (e) => {
		e.preventDefault();
		setNewPassword({
			...newPassword,
			[e.target.id]: e.target.value,
		});
	};
	const submitForm = async (e) => {
		e.preventDefault();
		const { error } = isNewPasswordValid(newPassword);
		if (error) {
			setError(error.toString().replace("ValidationError: ", ""));
			setTimeout(() => {
				setError(null);
			}, 3000);
			return;
		}
		try {
			const { repeat_new_password, ...password } = newPassword;
			const { data } = await axios.post(`/users/resetpassword/${params.resetToken}`, password);
			setSuccess(data.message);
			setTimeout(() => {
				setSuccess("");
				history.push("/users/login");
			}, 3000);
		} catch (error) {
			setError(error.response.data.error);
			setTimeout(() => {
				setError(null);
				setNewPassword({
					new_password: "",
					repeat_new_password: "",
				});
			}, 3000);
		}
	};
	return (
		<div className="form-container">
			<form className="form">
				{error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
				{success && <p style={{ color: "green", marginBottom: "1rem" }}>{success}</p>}
				<div>
					<label htmlFor="new_password" className="form-label">
						New Password:
					</label>
					<input
						id="new_password"
						type="text" // password?
						className="form-control"
						placeholder="New Password"
						value={newPassword.new_password}
						onChange={handleForm}
					/>
					<label htmlFor="repeat_new_password" className="form-label">
						Confirm New Password:
					</label>
					<input
						id="repeat_new_password"
						type="text" // password?
						className="form-control"
						placeholder="Confirm New Password"
						value={newPassword.repeat_new_password}
						onChange={handleForm}
					/>
					<button type="submit" className="form-button" onClick={submitForm}>
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default ResetPassword;
