import React from "react";

const ForgotPassword = () => {
	return (
		<div className="form-container">
			<form className="form">
				<div>
					<label htmlFor="email" className="form-label">
						Email:
					</label>
					<input id="email" type="text" className="form-control" placeholder="name@example.com" />

					<button type="submit" className="form-button">
						Send email
					</button>
				</div>
			</form>
		</div>
	);
};

export default ForgotPassword;
