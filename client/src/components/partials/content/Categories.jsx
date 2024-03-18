import { useEffect, useState } from "react";
import "./Categories.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CATEGORIES from "../../../default_data/Categories";
import { city } from "../../../redux/slices/CitySlice";

const Categories = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const currentCity = useSelector(city);
	const [cityName, setCityName] = useState("");
	const [transition, setTransition] = useState(false);

	useEffect(() => {
		if (currentCity) {
			setCityName(currentCity.city);
		}
	}, [currentCity, cityName]);

	useEffect(() => {
		const changeWindowWidth = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener("resize", changeWindowWidth);
		return () => {
			window.removeEventListener("resize", changeWindowWidth);
		};
	});

	const toggleCategoriesList = () => {
		setTransition(!transition);
	};

	return (
		<div className="categories">
			<div>
				<h2 className="section-title">Find business by category</h2>
				<div className="category-cards-container">
					<div className="category-cards-wrapper">
						{CATEGORIES.map((obj, i) => {
							return i < 3 && windowWidth > 768 ? (
								<Link
									key={obj.category}
									className="category-card-link"
									to={`/${cityName}/category/${obj.category}`}
								>
									<div className="category-card">
										<div className="category-card-image-container">
											<img className="category-card-image" src={obj.image} alt="" />
										</div>
										<div className="category-card-title-container">
											<p className="category-card-title">{obj.category}</p>
										</div>
									</div>
								</Link>
							) : (
								windowWidth < 769 && (
									<Link
										key={obj.category}
										className="category-card-link"
										to={`/${cityName}/category/${obj.category}`}
									>
										<div className="category-card">
											<div className="category-card-image-container">
												<img className="category-card-image" src={obj.image} alt="" />
											</div>
											<div className="category-card-title-container">
												<p className="category-card-title">{obj.category}</p>
											</div>
										</div>
									</Link>
								)
							);
						})}
						<div className="category-card-link category-toggle" onClick={toggleCategoriesList}>
							<div className="category-card">
								<div className="category-card-image-container">
									<i className="bi bi-three-dots"></i>
								</div>
								<div className="category-card-title-container">
									<p className="category-card-title">More categories</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={`more-categories-container ${transition ? "transition" : ""}`}>
					{CATEGORIES.slice(3).map((obj) => {
						return (
							<Link
								className="more-categories-container-link"
								key={obj.category}
								to={`/${cityName}/category/${obj.category}`}
							>
								{obj.category}
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Categories;
