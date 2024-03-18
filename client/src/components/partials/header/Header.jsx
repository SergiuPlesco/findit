import React from "react";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import LocationModal from "./LocationModal";
import SearchBar from "../../SearchBar";
import "./Header.css";

const Header = () => {
	return (
		<div className="header-background-image">
			<header className="header-container container">
				<div className="header-menu-container">
					<Logo />
					<HeaderMenu />
				</div>
				<div className="header-search-location-container">
					<LocationModal />
					<SearchBar />
				</div>
			</header>
		</div>
	);
};

export default Header;
