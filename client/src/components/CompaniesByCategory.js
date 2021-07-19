import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { companiesByCategory, error, isLoading } from "../redux/slices/CompaniesByCategorySlice";
import { getCompaniesByCategory } from "../redux/services/PublicServices";

const CompaniesByCategory = () => {
	const currentCity = localStorage.getItem("city");
	const dispatch = useDispatch();
	const { city, category } = useParams();

	useEffect(() => {
		dispatch(getCompaniesByCategory({ city, category }));
	}, [city, category]);

	const companies = useSelector(companiesByCategory);
	const companiesError = useSelector(error);
	const companiesIsLoading = useSelector(isLoading);

	return (
		<div>
			{companiesError && <div>{companiesError}</div>}
			{companiesIsLoading && <div>Companies loading...</div>}
			{companies.length > 0 && (
				<div>
					{companies.map((company) => {
						return (
							<div className="result-container" key={company}>
								<Link className="result-container_link" to={`/${city}/brand/${company.name}`}>
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

export default CompaniesByCategory;
