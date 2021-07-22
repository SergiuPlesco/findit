import { createSlice } from "@reduxjs/toolkit";
import { RegisterUser, LoginUser } from "../services/AuthenticationServices";

const AuthSlice = createSlice({
	name: "auth",
	initialState: {
		isLoggedIn: false,
		isRegistered: false,
		isLoading: false,
		error: null,
		token: "",
	},
	reducers: {
		logout: (state) => {
			state.isLoggedIn = false;
			state.token = "";
			console.log("logout");
		},
	},
	extraReducers: {
		// Registration
		[RegisterUser.pending]: (state) => {
			state.isLoggedIn = false;
			state.isRegistered = false;
			state.isLoading = true;
			state.error = null;
			state.token = "";
		},
		[RegisterUser.rejected]: (state, action) => {
			state.isLoggedIn = false;
			state.isRegistered = false;
			state.isLoading = false;
			state.error = action.payload;
			state.token = "";
		},
		[RegisterUser.fulfilled]: (state) => {
			state.isLoggedIn = false;
			state.isRegistered = true;
			state.isLoading = false;
			state.error = null;
			state.token = "";
		},
		// Logging
		[LoginUser.pending]: (state) => {
			state.isLoggedIn = false;
			state.isRegistered = false;
			state.isLoading = true;
			state.error = null;
			state.token = "";
		},
		[LoginUser.rejected]: (state, action) => {
			state.isLoggedIn = false;
			state.isRegistered = false;
			state.isLoading = false;
			state.error = action.payload;
			state.token = "";
		},
		[LoginUser.fulfilled]: (state, action) => {
			state.isLoggedIn = true;
			state.isRegistered = true;
			state.isLoading = false;
			state.error = null;
			state.token = action.payload.token;
		},
	},
});

export const { logout } = AuthSlice.actions;
export const userStatus = (state) => state.auth.isLoggedIn;

export default AuthSlice.reducer;
