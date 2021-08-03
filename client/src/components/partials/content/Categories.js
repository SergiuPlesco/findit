import React from "react";
import "./Categories.css";
import { Link } from "react-router-dom";
import CATEGORIES from "../../../default_data/Categories";

const Categories = () => {
	return (
		<div className="categories">
			<div>
				<h2 className="section-title">Find business by category</h2>
				<div className="category-cards-container">
					<div className="category-cards-wrapper">
						{CATEGORIES.map((obj) => {
							return (
								<Link className="category-card-link">
									<div key={obj.category} className="category-card">
										<div className="category-card-image-container">
											<img className="category-card-image" src={obj.image} alt="" />
										</div>
										<div className="category-card-title-container">
											<p className="category-card-title">{obj.category}</p>
										</div>
									</div>
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Categories;
