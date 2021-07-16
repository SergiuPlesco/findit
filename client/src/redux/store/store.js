import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice";
import cityReducer from "../slices/CitySlice";
import companyReducer from "../slices/CompanySlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		city: cityReducer,
		company: companyReducer,
	},
});

export default store;
