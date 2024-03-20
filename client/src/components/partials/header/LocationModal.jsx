import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBrandsAndCatByCity } from "../../../redux/services/PublicServices";
import Cities from "../../../default_data/CitiesUK";

import "./LocationModal.css";

const LocationModal = () => {
  let city = localStorage.getItem("city") ?? "Choose city";
  const [location, setLocation] = useState(city);
  const [userInput, setUserInput] = useState("");
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const dispatch = useDispatch();

  const changeLocation = (e) => {
    setUserInput(e.target.value);
  };

  const resetInput = () => {
    setUserInput("");
  };

  const toggleLocationDialog = (e) => {
    if (!showLocationDialog) {
      openLocationDialog();
    } else {
      closeLocationDialog();
    }
  };

  const openLocationDialog = () => {
    setShowLocationDialog(true);
  };

  const closeLocationDialog = () => {
    setShowLocationDialog(false);
    resetInput();
  };

  const saveLocationChanges = (e) => {
    e.preventDefault();
    if (userInput) {
      setLocation(userInput);
      localStorage.setItem("city", userInput);
      dispatch(getBrandsAndCatByCity(userInput));
      closeLocationDialog();
      return;
    }
    closeLocationDialog();
  };

  useEffect(() => {
    const handleLocationDialogKeyboard = (e) => {
      if (e.keyCode === 27) {
        closeLocationDialog();
      }
      if (e.keyCode === 13) {
        setLocation(userInput);
        localStorage.setItem("city", userInput);
        closeLocationDialog();
      }
    };
    document.addEventListener("keyup", handleLocationDialogKeyboard);
    return () => {
      document.removeEventListener("keyup", handleLocationDialogKeyboard);
    };
  });

  return (
    <div className="location-container">
      <div className="location-header">
        <div
          className="location-header-city-name"
          onClick={toggleLocationDialog}
          tabIndex="0"
        >
          <i className="bi bi-geo-alt-fill"></i>

          <p>{location}</p>
          <i className="bi bi-chevron-down"></i>
        </div>
      </div>
      <div
        className={`location-modal-backdrop ${
          showLocationDialog ? "active" : ""
        }`}
        onClick={closeLocationDialog}
      ></div>
      {showLocationDialog && (
        <div
          className="location-body"
          id="changeLocationModal"
          tabIndex="0"
          aria-labelledby="change-location"
          aria-hidden="true"
        >
          <div className="location-body-dialog">
            <div className="location-body-content">
              <div className="location-body-header">
                <p className="location-body-title" id="change-location">
                  Change location
                </p>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close Location Dialog"
                  onClick={closeLocationDialog}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
              <div className="location-body-form">
                <select
                  className="form-input"
                  id="city"
                  type="select"
                  value={userInput}
                  placeholder="Choose city"
                  onChange={changeLocation}
                >
                  <option disabled value="">
                    Choose from the list
                  </option>
                  {Cities.map((city) => {
                    return (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="location-body-footer">
                <button
                  type="button"
                  className="location-btn"
                  data-bs-dismiss="modal"
                  onClick={closeLocationDialog}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="location-btn"
                  data-bs-dismiss="modal"
                  onClick={(e) => {
                    saveLocationChanges(e);
                  }}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationModal;
