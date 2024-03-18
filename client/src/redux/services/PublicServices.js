import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getBrandsAndCatByCity = createAsyncThunk(
  "city/cityStatus",
  async (city, { rejectWithValue }) => {
    try {
      const result = await axios.get(`/${city}`);

      return result.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const getCompany = createAsyncThunk(
  "companyDetails/status",
  async ({ city, brand }, { rejectWithValue }) => {
    try {
      const result = await axios.get(`/${city}/brand/${brand}`);
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const getCompaniesByCategory = createAsyncThunk(
  "companiesByCategory/status",
  async ({ city, category }, { rejectWithValue }) => {
    try {
      const result = await axios.get(`/${city}/category/${category}`);
      return result.data;
    } catch ({ error }) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
export { getBrandsAndCatByCity, getCompany, getCompaniesByCategory };
