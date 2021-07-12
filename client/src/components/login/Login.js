import "./Login.css";

const Login = () => {
	return (
		<div className="container-form">
			<form className="form">
				<div>
					<label htmlFor="email" className="form-label">
						Email:
					</label>
					<input id="email" type="text" className="form-control" placeholder="name@example.com" />
					<label htmlFor="password" className="form-label">
						password:
					</label>
					<input id="password" type="text" className="form-control" placeholder="Password" />
					<button type="submit" className="btn btn-primary mt-3">
						Log in
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
