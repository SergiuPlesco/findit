import React from "react";

import LocationModal from "./LocationModal";

const MainNavigation = () => {
	return (
		<div>
			<nav className="nav nav-bar d-flex justify-content-between">
				<h1 className="logo">FINDIT.com</h1>

				<LocationModal />
			</nav>
		</div>
	);
};

export default MainNavigation;
