import { createSlice } from "@reduxjs/toolkit";
import { getBrandsAndCatByCity } from "../services/PublicServices.js";

const CitySlice = createSlice({
  name: "city",
  initialState: {
    isLoading: false,
    error: null,
    city: null,
    categories: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBrandsAndCatByCity.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.city = null;
    });
    builder.addCase(getBrandsAndCatByCity.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.city = null;
    });
    builder.addCase(getBrandsAndCatByCity.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.city = action.payload;
    });
  },
});

export const city = (state) => state.city.city;
export const error = (state) => state.city.error;
export const isLoading = (state) => state.city.isLoading;

export default CitySlice.reducer;
