import React, { useState, useEffect } from "react";
import getUserCoordinates from "../../../utils/getUserCoordinates";
import userLocation from "../../../utils/userLocation";
import "bootstrap/js/dist/modal";
import "./LocationModal.css";

const LocationModal = () => {
	let city = localStorage.getItem("city") ?? "Choose city";
	const [location, setLocation] = useState(city);
	const [userInput, setUserInput] = useState("");

	useEffect(() => {
		if (!localStorage.getItem("city")) {
			getUserCoordinates()
				.then((position) => {
					const lat = position.coords.latitude;
					const lon = position.coords.longitude;

					userLocation(lat, lon)
						.then((data) => {
							setLocation(data);
						})
						.catch((error) => {
							console.log(error);
						});
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [location]);

	const changeLocation = (e) => {
		setUserInput(e.target.value);
	};

	const resetInput = () => {
		setUserInput("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLocation(userInput);
		localStorage.setItem("city", userInput);
		resetInput();
	};

	return (
		<>
			<div
				className="location-modal-component d-flex align-items-center flex-column"
				data-bs-toggle="modal"
				data-bs-target="#changeLocationModal"
			>
				<div>
					<i className="bi bi-geo-alt-fill"></i>

					{location}
				</div>

				<div>
					<p className="small muted mb-0">Change city</p>
				</div>
			</div>

			<div
				className="modal fade"
				id="changeLocationModal"
				tabIndex="-1"
				aria-labelledby="change-location"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="change-location">
								Change location
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={resetInput}
							></button>
						</div>
						<div className="modal-body">
							<input
								className="form-control"
								type="text"
								value={userInput}
								onChange={changeLocation}
							/>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
								onClick={resetInput}
							>
								Close
							</button>
							<button
								type="button"
								className="btn btn-primary"
								data-bs-dismiss="modal"
								onClick={handleSubmit}
							>
								Save changes
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LocationModal;
