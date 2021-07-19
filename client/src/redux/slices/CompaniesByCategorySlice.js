import { createSlice } from "@reduxjs/toolkit";
import { getCompaniesByCategory } from "../services/PublicServices";

const companiesByCategorSlice = createSlice({
	name: "comapniesByCategory",
	initialState: {
		isLoading: false,
		error: null,
		companies: [],
	},
	reducers: {},
	extraReducers: {
		[getCompaniesByCategory.pending]: (state) => {
			state.isLoading = true;
			state.error = null;
			state.companies = [];
		},
		[getCompaniesByCategory.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
			state.companies = [];
		},
		[getCompaniesByCategory.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.error = null;
			state.companies = action.payload;
		},
	},
});

export const companiesByCategory = (state) => state.companiesByCategory.companies;
export const isLoading = (state) => state.companiesByCategory.isLoading;
export const error = (state) => state.companiesByCategory.error;

export default companiesByCategorSlice.reducer;
