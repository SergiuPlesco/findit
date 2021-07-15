import React from "react";

const Register = () => {
	return (
		<div className="container-form">
			<form className="form">
				<div>
					<label htmlFor="firstname" className="form-label">
						First Name:
					</label>
					<input
						id="firstname"
						type="text"
						className="form-control"
						placeholder="name@example.com"
					/>
					<label htmlFor="lastname" className="form-label">
						Last Name:
					</label>
					<input
						id="lastname"
						type="text"
						className="form-control"
						placeholder="name@example.com"
					/>
					<label htmlFor="email" className="form-label">
						Email:
					</label>
					<input id="email" type="text" className="form-control" placeholder="name@example.com" />
					<label htmlFor="password" className="form-label">
						Password:
					</label>
					<input id="confirmpassword" type="text" className="form-control" placeholder="Password" />
					<label htmlFor="confirmpassword" className="form-label">
						Confirm Password:
					</label>
					<input
						id="password"
						type="text"
						className="form-control"
						placeholder="Confirm Password"
					/>
					<button type="submit" className="btn btn-primary mt-3">
						Register
					</button>
				</div>
			</form>
		</div>
	);
};

export default Register;
