import React, { useState, useEffect } from "react";
import data from "../data.json";
import "./SearchBar.css";

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
		<div className="search-container">
			<form>
				<div className="search-container_input-container">
					<input
						type="text"
						className="search-container_input"
						placeholder="Search business or category"
						aria-label="Search"
						value={searchValue}
						onChange={handleSearchInput}
					/>

					<button type="submit" className="search-container_button" aria-label="Go">
						<i className="bi bi-search"></i>
					</button>
				</div>
			</form>
			{suggestions && (
				<div className="search-results_container">
					{suggestions.companies.length > 0 && (
						<div className="search-results">
							<p className="search-results_title">Brands:</p>
							{suggestions.companies.map((company) => {
								return (
									<a tabIndex="0" className="search-results_text">
										{company}
									</a>
								);
							})}
						</div>
					)}
					{suggestions.categories.length > 0 && (
						<div className="search-results">
							<p className="search-results_title">Categories:</p>
							{suggestions.categories.map((category) => (
								<a tabIndex="0" className="search-results_text">
									{category}
								</a>
							))}
						</div>
					)}
					{suggestions.companies.length === 0 && suggestions.categories.length === 0 && (
						<div className="search-results">
							<p className="search-results_text">No results, try another search.</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default SearchBar;
