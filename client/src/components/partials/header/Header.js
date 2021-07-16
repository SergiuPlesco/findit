import React from "react";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import LocationModal from "./LocationModal";
import SearchBar from "../../SearchBar";
import "./Header.css";

const Header = () => {
	return (
		<header className="header-container">
			<div className="header-menu-container">
				<Logo />
				<HeaderMenu />
			</div>
			<div className="header-search-location-container">
				<LocationModal />
				<SearchBar />
			</div>
		</header>
	);
};

export default Header;
