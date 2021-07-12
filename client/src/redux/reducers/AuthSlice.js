import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
	name: "auth",
	initialState: {
		isLoggedIn: false,
		isLoading: false,
		error: null,
		token: "",
	},
	reducers: {},
	extraReducers: {},
});

export default AuthSlice.reducer;
