import { createSlice } from "@reduxjs/toolkit";
import {
	getUser,
	getUserCompany,
	updateUserInfo,
	updateUserCompany,
	addUserCompany,
	deleteUserCompany,
} from "../services/UserProfileServices";

const UserProfileSlice = createSlice({
	name: "userProfile",
	initialState: {
		user: undefined,
		error: null,
		isLoading: false,
		company: undefined,
	},
	reducers: {
		logUserOut: (state) => {
			state.user = undefined;
			state.company = undefined;
			state.isLoading = false;
			console.log("user profile logout");
		},
	},
	extraReducers: {
		// get user
		[getUser.pending]: (state) => {
			state.user = undefined;
			state.error = null;
			state.isLoading = true;
		},
		[getUser.rejected]: (state, action) => {
			state.user = undefined;
			state.error = action.payload;
			state.isLoading = false;
		},
		[getUser.fulfilled]: (state, action) => {
			state.user = action.payload.user;
			state.error = null;
			state.isLoading = false;
		},
		// update user
		[updateUserInfo.pending]: (state) => {
			state.isLoading = true;
			state.error = null;
		},
		[updateUserInfo.rejected]: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		[updateUserInfo.fulfilled]: (state, action) => {
			state.user = action.payload.user;
			state.isLoading = false;
			state.error = null;
		},
		// get company
		[getUserCompany.pending]: (state) => {
			state.company = undefined;
			state.isLoading = true;
			state.isLoading = true;
		},
		[getUserCompany.rejected]: (state, action) => {
			state.company = undefined;
			state.error = action.payload;
			state.isLoading = false;
		},
		[getUserCompany.fulfilled]: (state, action) => {
			state.company = action.payload.company;
			state.error = null;
			state.isLoading = false;
		},
		// add company
		[addUserCompany.pending]: (state) => {
			state.isLoading = true;
			state.error = null;
		},
		[addUserCompany.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		[addUserCompany.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.error = null;
			state.company = action.payload.company;
		},
		// update company
		[updateUserCompany.pending]: (state) => {
			state.isLoading = true;
			state.error = null;
		},
		[updateUserCompany.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		[updateUserCompany.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.error = null;
			state.company = action.payload.company;
		},
		// delete company
		[deleteUserCompany.pending]: (state) => {
			state.isLoading = true;
			state.error = null;
		},
		[deleteUserCompany.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		[deleteUserCompany.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.error = null;
			state.company = action.payload;
		},
	},
});

// Actions
export const { logUserOut } = UserProfileSlice.actions;

// Selectors
export const error = (state) => state.userProfile.error;
export const isLoading = (state) => state.userProfile.isLoading;
export const user = (state) => state.userProfile.user;
export const company = (state) => state.userProfile.company;

export default UserProfileSlice.reducer;
