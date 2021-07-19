import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice";
import cityReducer from "../slices/CitySlice";
import companyReducer from "../slices/CompanySlice";
import companiesByCategoryReducer from "../slices/CompaniesByCategorySlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		city: cityReducer,
		company: companyReducer,
		companiesByCategory: companiesByCategoryReducer,
	},
});

export default store;
