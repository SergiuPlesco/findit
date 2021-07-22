import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const RegisterUser = createAsyncThunk("auth/register", async (user, { rejectWithValue }) => {
	try {
		const result = await axios.post("/users/register", user);
		return result.data;
	} catch (error) {
		return rejectWithValue(error.response.data.error);
	}
});

const LoginUser = createAsyncThunk("auth/login", async (user, { rejectWithValue }) => {
	try {
		const result = await axios.post("/users/login", user);
		return result.data;
	} catch (error) {
		return rejectWithValue(error.response.data.error);
	}
});

export { RegisterUser, LoginUser };
