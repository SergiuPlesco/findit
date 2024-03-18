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
  extraReducers: (bulder) => {
    bulder.addCase(getCompaniesByCategory.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.companies = [];
    });
    bulder.addCase(getCompaniesByCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.companies = [];
    });
    bulder.addCase(getCompaniesByCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.companies = action.payload;
    });
  },
});

export const companiesByCategory = (state) =>
  state.companiesByCategory.companies;
export const isLoading = (state) => state.companiesByCategory.isLoading;
export const error = (state) => state.companiesByCategory.error;

export default companiesByCategorSlice.reducer;
