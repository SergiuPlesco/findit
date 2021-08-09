import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userStatus, logout, userId } from "../../../redux/slices/AuthSlice";
import { logUserOut } from "../../../redux/slices/UserProfileSlice";
import { Button, Backdrop, MenuContainer, UL } from "./styles";

const HeaderMenu = () => {
	const [menustate, setMenuState] = useState(false);
	const [userLoggedIn, setUserLoggedIn] = useState(false);
	const isUserLoggedIn = useSelector(userStatus);
	const id = useSelector(userId);
	const dispatch = useDispatch();
	const handleMenuState = () => {
		setMenuState(!menustate);
	};

	useEffect(() => {
		if (isUserLoggedIn) {
			setUserLoggedIn(true);
		}
	}, [userLoggedIn, dispatch, isUserLoggedIn]);
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
					{!isUserLoggedIn ? (
						<>
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
						</>
					) : (
						<>
							<li className="menu-item">
								<Link className="menu-link" to={id ? `/users/${id}` : `/users/login`}>
									Dashboard
								</Link>
							</li>
							<li
								className="menu-item"
								onClick={() => {
									dispatch(logout());
									dispatch(logUserOut());
									localStorage.removeItem("authToken");
									localStorage.removeItem("isUserLoggedIn");
								}}
							>
								<Link className="menu-link" to="/users/login">
									Log out
								</Link>
							</li>
						</>
					)}
				</UL>
			</MenuContainer>
		</nav>
	);
};

export default HeaderMenu;
