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
		userId: "",
	},
	reducers: {
		logout: (state) => {
			state.isLoggedIn = false;
			state.token = "";
			state.userId = "";
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
			state.userId = "";
		},
		[RegisterUser.rejected]: (state, action) => {
			state.isLoggedIn = false;
			state.isRegistered = false;
			state.isLoading = false;
			state.error = action.payload;
			state.token = "";
			state.userId = "";
		},
		[RegisterUser.fulfilled]: (state) => {
			state.isLoggedIn = false;
			state.isRegistered = true;
			state.isLoading = false;
			state.error = null;
			state.token = "";
			state.userId = "";
		},
		// Logging
		[LoginUser.pending]: (state) => {
			state.isLoggedIn = false;
			state.isRegistered = false;
			state.isLoading = true;
			state.error = null;
			state.token = "";
			state.userId = "";
		},
		[LoginUser.rejected]: (state, action) => {
			state.isLoggedIn = false;
			state.isRegistered = false;
			state.isLoading = false;
			state.error = action.payload;
			state.token = "";
			state.userId = "";
		},
		[LoginUser.fulfilled]: (state, action) => {
			state.isLoggedIn = true;
			state.isRegistered = true;
			state.isLoading = false;
			state.error = null;
			state.token = action.payload.token;
			state.userId = action.payload.id;
		},
	},
});

export const { logout } = AuthSlice.actions;
export const userId = (state) => state.auth.userId;
export const userStatus = (state) => state.auth.isLoggedIn;
export const userToken = (state) => state.auth.token;

export default AuthSlice.reducer;
