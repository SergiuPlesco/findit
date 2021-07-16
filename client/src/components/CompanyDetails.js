import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { company, error, isLoading } from "../redux/slices/CompanySlice";
import { getCompany } from "../redux/services/PublicServices";

const CompanyDetails = () => {
	// url params
	const { city, brand } = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		if (city && brand) {
			dispatch(getCompany({ city, brand }));
		}
	}, []);

	const companySelected = useSelector(company);
	const errorSelected = useSelector(error);
	const isLoadingSelected = useSelector(isLoading);

	return (
		<>
			{errorSelected && <div>{errorSelected}</div>}
			{isLoadingSelected && <div>Loading...</div>}
			{companySelected && (
				<div>
					<h3>Name: {companySelected.name}</h3>
					<p>Category: {companySelected.category}</p>
					<p>Services: {companySelected.services}</p>
					<p>Description: {companySelected.description}</p>
					<p>City: {companySelected.city}</p>
					<p>Address: {companySelected.address}</p>
					<p>Contact: {companySelected.contact}</p>
				</div>
			)}
		</>
	);
};

export default CompanyDetails;
