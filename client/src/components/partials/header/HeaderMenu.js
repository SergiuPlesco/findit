import { useState } from "react";
import { Link } from "react-router-dom";
// import "./HeaderMenu.css";
import { Button, Backdrop, MenuContainer, UL } from "./styles";

const HeaderMenu = () => {
	const [menustate, setMenuState] = useState(false);
	const handleMenuState = () => {
		setMenuState(!menustate);
	};
	return (
		<nav className="header-nav">
			<Button className="menu-toggler" onClick={handleMenuState}>
				<i className="bi bi-list"></i>
			</Button>
			<Backdrop
				className="menu-backdrop"
				menustate={menustate}
				onClick={handleMenuState}
			></Backdrop>
			<MenuContainer className="menu-container" menustate={menustate}>
				<UL className="menu" menustate={menustate} onClick={handleMenuState}>
					<li className="menu-item">
						<Link className="menu-link" to="/users/login">
							Company Log In
						</Link>
					</li>
					<li className="menu-item">
						<Link className="menu-link" to="/users/register">
							Company Register
						</Link>
					</li>
				</UL>
			</MenuContainer>
		</nav>
	);
};

export default HeaderMenu;
