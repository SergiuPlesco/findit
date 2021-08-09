import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { city, error, isLoading } from "../../../redux/slices/CitySlice";
import { getBrandsAndCatByCity } from "../../../redux/services/PublicServices";

import "./Content.css";

const Content = () => {
	const dispatch = useDispatch();
	const localStorageCity = localStorage.getItem("city");
	useEffect(() => {
		if (localStorageCity) {
			dispatch(getBrandsAndCatByCity(localStorageCity));
		}
	}, [dispatch, localStorageCity]);

	const selectedCity = useSelector(city);
	const errorCity = useSelector(error);
	const isLoadingCity = useSelector(isLoading);

	// const [currentCity, setCurrentCity] = useState();
	// const [currentCityError, setCurrentCityError] = useState();
	// const [currentCityLoading, setCurrentCityLoading] = useState();

	// useEffect(() => {
	// 	if (selectedCity) {
	// 		setCurrentCity(selectedCity);
	// 		setCurrentCityLoading(false);
	// 		setCurrentCityError(null);
	// 	} else if (errorCity) {
	// 		setCurrentCityError(errorCity);
	// 		setCurrentCityLoading(false);
	// 		setCurrentCity(undefined);
	// 	} else if (isLoadingCity) {
	// 		setCurrentCity(undefined);
	// 		setCurrentCityLoading(isLoadingCity);
	// 		setCurrentCityError(null);
	// 	}
	// }, [selectedCity, errorCity]);

	return (
		<div>
			{errorCity && <div>{`An error occurred: ${errorCity}`}</div>}
			{isLoadingCity && <div>Loading...</div>}

			{selectedCity && selectedCity?.brands.length > 0 && (
				<div>
					<div>
						<h2 className="section-title">Popular Local Businesses</h2>
					</div>
					{selectedCity.brands.map((company) => {
						return (
							<div className="result-container" key={company.id}>
								<Link
									className="result-container_link"
									to={`/${selectedCity.city}/brand/${company.name}`}
								>
									<div className="result-container_link_content">
										<div className="result-container_link_image-wrapper">
											<img className="result-container_link_image" src={company.logoImage} alt="" />
										</div>
										<div>
											<h3 className="result-container_link-title">{company.name}</h3>
											<p className="result-container_link-category">{company.category}</p>
										</div>
									</div>
								</Link>
							</div>
						);
					})}
				</div>
			)}
			{selectedCity && selectedCity?.brands.length === 0 && (
				<div>
					<p>Sorry, but coming with nothing for {selectedCity.city}, choose another city</p>
				</div>
			)}
		</div>
	);
};

export default Content;
