import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { company, error, isLoading } from "../redux/slices/CompanySlice";
import { getCompany } from "../redux/services/PublicServices";
import "./CompanyDetails.css";

const CompanyDetails = () => {
	// url params
	const { city, brand } = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		if (city && brand) {
			dispatch(getCompany({ city, brand }));
		}
	}, [city, brand]);

	const companySelected = useSelector(company);
	const errorSelected = useSelector(error);
	const isLoadingSelected = useSelector(isLoading);

	return (
		<>
			{errorSelected && <div>{errorSelected}</div>}
			{isLoadingSelected && <div>Loading...</div>}
			{companySelected && (
				<div className="company-details_container">
					<div className="comapny-details_header">
						<h2 className="company-title">{companySelected.name}</h2>
						<p className="company-category">{companySelected.category}</p>
					</div>
					<div className="company-details_body">
						<div className="company-details_body-left">
							<p className="company-details-text">
								<span className="company-details-label">Services:</span> {companySelected.services}
							</p>

							<p className="company-details-text">
								<span className="company-details-label">City:</span> {companySelected.city}
							</p>
							<p className="company-details-text">
								<span className="company-details-label">Str:</span> {companySelected.address}
							</p>
							<p className="company-details-text">
								<span className="company-details-label">Contact:</span> {companySelected.contact}
							</p>
						</div>
						<div className="company-details_body-right">
							<p className="company-details-text">{companySelected.description}</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default CompanyDetails;
