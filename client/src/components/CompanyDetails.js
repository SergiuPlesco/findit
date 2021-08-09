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
	}, [city, brand, dispatch]);

	const companySelected = useSelector(company);
	const errorSelected = useSelector(error);
	const isLoadingSelected = useSelector(isLoading);

	return (
		<>
			{errorSelected && <div>{errorSelected}</div>}
			{isLoadingSelected && <div>Loading...</div>}
			{companySelected && (
				<div className="company-details_container">
					<div className="company-details-cover_container">
						<img
							className="company-details-cover_image"
							src={companySelected.coverImage}
							alt="Cover"
						/>
					</div>
					<div className="company-details-logo_container">
						<div className="company-details-logo_wrapper">
							<img
								className="company-details-logo_image"
								src={companySelected.logoImage}
								alt="Logo"
							/>
						</div>
					</div>
					<div className="comapny-details_header">
						<h2 className="company-title">{companySelected.name}</h2>
						<p className="company-category">{companySelected.category}</p>
					</div>
					<div className="company-details_body">
						<div className="company-details_body-left">
							<div className="company-details-text">
								<h4 className="company-details-label">Services:</h4>
								<p>{companySelected.services}</p>
							</div>

							<div className="company-details-text">
								<h4 className="company-details-label">City:</h4>
								<p>{companySelected.city}</p>
							</div>
							<div className="company-details-text">
								<h4 className="company-details-label">Str:</h4>
								<p>{companySelected.address}</p>
							</div>
							<div className="company-details-text">
								<h4 className="company-details-label">Contact:</h4>
								<p>{companySelected.contact}</p>
							</div>
						</div>
						<div className="company-details_body-right">
							<h4 className="company-details-label">About Us</h4>
							<p className="company-details-text">{companySelected.description}</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default CompanyDetails;
