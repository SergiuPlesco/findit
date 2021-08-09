import React from "react";
import "./Footer.css";

const Footer = () => {
	return (
		<div className="footer">
			<div className="container">
				<div className="site-info-container">
					<div className="site-info-column">
						<h3 className="site-info-column-title">About</h3>
						<div className="site-info-column-links">
							<p>About FINDit</p>
							<p>Terms of Service</p>
							<p>Privacy Policy</p>
						</div>
					</div>
					<div className="site-info-column">
						<h3 className="site-info-column-title">FINDit for business</h3>
						<div className="site-info-column-links">
							<p>Register Company</p>
							<p>Company Support</p>
						</div>
					</div>
					<div className="site-info-column">
						<h3 className="site-info-column-title">Country</h3>
						<div className="site-info-column-links">
							<p>Moldova</p>
						</div>
					</div>
				</div>
				<div className="site-copy">
					<p>FINDit ALL RIGHTS RESERVED 2021</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
