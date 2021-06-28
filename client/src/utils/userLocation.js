import React, { useState, useEffect } from "react";
import getUserCoordinates from "./getUserCoordinates";

const userLocation = async (lat, lon) => {
	const APIKEY = process.env.REACT_APP_OPENWEATHER_API_KEY ?? "b4a0b649139f5b4373159ea93ea91f98";
	const coordURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`;
	const result = await fetch(coordURL)
		.then((response) => {
			if (!response.ok) {
				throw Error("Could not fetch coord URL");
			}
			return response.json();
		})
		.then((data) => {
			localStorage.setItem("city", data.name);
			console.log(data.name);
			return data.name;
		})
		.catch((err) => {
			console.log(`${err.message}`);
		});
	return result;
};

export default userLocation;
