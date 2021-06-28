import React, { useState, useEffect } from "react";
import data from "../data.json";

const SearchBar = () => {
	const [searchValue, setSearchValue] = useState("");
	const [suggestions, setSuggetions] = useState(null);

	const handleSearchInput = (e) => {
		setSearchValue(e.target.value);
	};

	const getSuggestions = (value) => {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;
		const companiesName = [];

		const filteredCategories =
			inputLength === 0
				? []
				: data
						.filter((section) => {
							// Returns an array of "sections" with categories and companies keys
							return section.category.toLowerCase().slice(0, inputLength) === inputValue;
						})
						.map((section) => {
							// Returns an array with categories of type string
							return section.category;
						});

		const filteredBrands =
			inputLength === 0
				? []
				: data
						.map((section) => {
							return section.companies.filter(
								// filter results
								(entity) => {
									return entity.toLowerCase().slice(0, inputLength) === inputValue;
								}
							);
						})
						.filter((entity) => entity.length > 0)
						.map((entity) => {
							return entity.forEach((el) => companiesName.push(el));
						});

		console.log(filteredCategories);
		console.log(companiesName);
		setSuggetions({
			categories: filteredCategories,
			companies: companiesName,
		});
	};

	useEffect(() => {
		if (searchValue) {
			getSuggestions(searchValue);
		} else if (searchValue === "") {
			setSuggetions(null);
		}
	}, [searchValue]);
	// show results for search for user city
	return (
		<>
			<form>
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						placeholder="Search business"
						aria-label="Search"
						value={searchValue}
						onChange={handleSearchInput}
					/>

					<button
						type="submit"
						className="btn btn-outline-secondary bg-primary text-white"
						aria-label="Go"
					>
						<i className="bi bi-search"></i>
					</button>
				</div>
			</form>
			{suggestions && (
				<div className="search-results__container border">
					{suggestions.companies.length > 0 && (
						<div className="">
							<p className="search-results__title bg-secondary p-2 mb-1 text-white">Brands:</p>
							{suggestions.companies.map((company) => {
								return <p className="p-2 fw-bold m-1">{company}</p>;
							})}
						</div>
					)}
					{suggestions.categories.length > 0 && (
						<div>
							<p className="search-results__title bg-secondary p-2 mb-1 text-white">Categories:</p>
							{suggestions.categories.map((category) => (
								<p className="p-2 fw-bold m-1">{category}</p>
							))}
						</div>
					)}
					{suggestions.companies.length === 0 && suggestions.categories.length === 0 && (
						<div className="">
							<p className="p-2 fw-bold m-1">No results, try another search.</p>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default SearchBar;
