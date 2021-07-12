import React from "react";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import LocationModal from "./LocationModal";
import "./Header.css";

const Header = () => {
	return (
		<div className="header-container">
			<Logo />
			<HeaderMenu />
		</div>
	);
};

export default Header;
