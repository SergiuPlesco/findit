import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { city, error, isLoading } from "../../../redux/slices/CitySlice";
import "./Content.css";

const Content = () => {
	const [currentCity, setCurrentCity] = useState();
	const [currentCityError, setCurrentCityError] = useState();
	const selectedCity = useSelector(city);
	const errorCity = useSelector(error);
	const isLoadingCity = useSelector(isLoading);
	useEffect(() => {
		if (selectedCity) {
			setCurrentCity(selectedCity);
		} else if (errorCity) {
			setCurrentCityError(errorCity);
		}
	}, [selectedCity]);

	return (
		<div>
			{currentCityError && <div>{`An error occurred: ${currentCityError}`}</div>}
			{isLoadingCity && <div>Loading...</div>}

			{currentCity && currentCity.brands.length > 0 && (
				<div>
					{/* <div>
						{currentCity.brands.length} registered companies in: {currentCity.city}
					</div> */}
					{currentCity.brands.map((company) => {
						return (
							<div className="result-container" key={company.id}>
								<Link
									className="result-container_link"
									to={`/${currentCity.city}/brand/${company.name}`}
								>
									<div>
										<h3 className="result-container_link-title">{company.name}</h3>
										<p className="result-container_link-category">{company.category}</p>
									</div>
								</Link>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Content;
