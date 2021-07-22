import React from "react";

const ResetPassword = () => {
	return (
		<div className="form-container">
			<form className="form">
				<div>
					<label htmlFor="password" className="form-label">
						New Password:
					</label>
					<input id="password" type="text" className="form-control" placeholder="New Password" />
					<label htmlFor="password" className="form-label">
						Confirm New Password:
					</label>
					<input
						id="password"
						type="text"
						className="form-control"
						placeholder="Confirm New Password"
					/>
					<button type="submit" className="form-button">
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default ResetPassword;
