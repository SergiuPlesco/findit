import { createSlice } from "@reduxjs/toolkit";
import { getCompany } from "../services/PublicServices";

const CompanySlice = createSlice({
  name: "companyDetails",
  initialState: {
    isLoading: false,
    error: null,
    company: undefined, // object
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCompany.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.company = undefined;
    });
    builder.addCase(getCompany.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.company = undefined;
    });
    builder.addCase(getCompany.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.company = action.payload;
    });
  },
});

export const isLoading = (state) => state.company.isLoading;
export const error = (state) => state.company.error;
export const company = (state) => state.company.company;

export default CompanySlice.reducer;
