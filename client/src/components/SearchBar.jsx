import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./SearchBar.css";
import { city } from "../redux/slices/CitySlice";

const SearchBar = () => {
	const [searchValue, setSearchValue] = useState("");
	const [suggestions, setSuggetions] = useState(null);
	const currentCity = useSelector(city);

	const handleSearchInput = (e) => {
		setSearchValue(e.target.value);
	};

	const getSuggestions = (value) => {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;

		const filteredBrands =
			inputLength === 0
				? []
				: currentCity.brands.filter((entity) => {
						return entity.name.toLowerCase().slice(0, inputLength) === inputValue;
				  });

		const filteredCategories =
			inputLength === 0
				? []
				: currentCity.categories.filter((category) => {
						return category.toLowerCase().slice(0, inputLength) === inputValue;
				  });

		setSuggetions({
			categories: filteredCategories,
			companies: filteredBrands,
		});
	};

	const resetSuggestionsInput = (e) => {
		e.preventDefault();
		setSearchValue("");
	};

	const closeSuggestionsWindow = (e) => {
		e.preventDefault();
		setSuggetions(null);
		resetSuggestionsInput(e);
	};

	const showResultsBySearch = (e) => {
		e.preventDefault();
		getSuggestions(searchValue);
	};

	useEffect(() => {
		if (searchValue === "") {
			setSuggetions(null);
		}
	}, [searchValue, currentCity]);

	useEffect(() => {
		const handleSuggestionsWindowKeyboard = (e) => {
			if (e.keyCode === 27) {
				closeSuggestionsWindow(e);
			}
		};
		document.addEventListener("keyup", handleSuggestionsWindowKeyboard);
		return () => {
			document.removeEventListener("keyup", handleSuggestionsWindowKeyboard);
		};
	});
	return (
		<div className="search-container">
			<form>
				<div className="search-container_input-container">
					<input
						type="text"
						className="search-container_input"
						placeholder={`Search business by name or category in ${
							currentCity?.city ?? "selected city"
						}`}
						aria-label="Search"
						value={searchValue}
						onChange={(e) => {
							handleSearchInput(e);
							getSuggestions(e.target.value);
						}}
						onClick={(e) => {
							e.stopPropagation();
							e.preventDefault();
						}}
					/>
					<button
						className="reset-input-button"
						aria-label="reset input"
						onClick={resetSuggestionsInput}
					>
						<i className="bi bi-x-lg"></i>
					</button>

					<button className="search-container_button" aria-label="Go" onClick={showResultsBySearch}>
						<i className="bi bi-search"></i>
					</button>
				</div>
			</form>
			{suggestions && (
				<div className="search-results_container">
					{suggestions.companies.length > 0 && (
						<div className="search-results">
							<p className="search-results_title">Brands:</p>
							{suggestions.companies.map((company, index) => {
								return (
									<div
										key={index}
										onClick={(e) => {
											closeSuggestionsWindow(e);
										}}
									>
										<Link
											to={`/${currentCity.city}/brand/${company.name}`}
											tabIndex="0"
											className="search-results_text"
										>
											{company.name}
										</Link>
									</div>
								);
							})}
						</div>
					)}
					{suggestions.categories.length > 0 && (
						<div className="search-results">
							<p className="search-results_title">Categories:</p>
							{suggestions.categories.map((category, index) => {
								return (
									<div
										key={index}
										onClick={(e) => {
											closeSuggestionsWindow(e);
										}}
									>
										<Link
											to={`/${localStorage.getItem("city")}/category/${category}`}
											tabIndex="0"
											className="search-results_text"
										>
											{category}
										</Link>
									</div>
								);
							})}
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
