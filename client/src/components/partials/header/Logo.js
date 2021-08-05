import { Link } from "react-router-dom";

const Logo = () => {
	return (
		<div className="site-logo">
			<Link to="/">
				<h1 className="logo">FINDIT.com</h1>
			</Link>
		</div>
	);
};

export default Logo;
