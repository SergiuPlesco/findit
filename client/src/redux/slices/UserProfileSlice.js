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
		errorUser: null,
		isLoadingUser: false,
		company: undefined,
		errorCompany: null,
		isLoadingCompany: false,
	},
	reducers: {
		logUserOut: (state) => {
			state.user = undefined;
			state.company = undefined;
			state.isLoadingUser = false;
		},
	},
	extraReducers: {
		// get user
		[getUser.pending]: (state) => {
			state.user = undefined;
			state.errorUser = null;
			state.isLoadingUser = true;
		},
		[getUser.rejected]: (state, action) => {
			state.user = undefined;
			state.errorUser = action.payload;
			state.isLoadingUser = false;
		},
		[getUser.fulfilled]: (state, action) => {
			state.user = action.payload.user;
			state.errorUser = null;
			state.isLoadingUser = false;
		},
		// update user
		[updateUserInfo.pending]: (state) => {
			state.isLoading = true;
			state.errorUser = null;
		},
		[updateUserInfo.rejected]: (state, action) => {
			state.error = action.payload;
			state.isLoadingUser = false;
		},
		[updateUserInfo.fulfilled]: (state, action) => {
			state.user = action.payload.user;
			state.isLoadingUser = false;
			state.errorUser = null;
		},
		// get company
		[getUserCompany.pending]: (state) => {
			state.company = undefined;
			state.isLoadingCompany = true;
		},
		[getUserCompany.rejected]: (state, action) => {
			state.company = undefined;
			state.errorCompany = action.payload;
			state.isLoadingCompany = false;
		},
		[getUserCompany.fulfilled]: (state, action) => {
			state.company = action.payload.company;
			state.errorCompany = null;
			state.isLoadingCompany = false;
		},
		// add company
		[addUserCompany.pending]: (state) => {
			state.isLoadingCompany = true;
			state.errorCompany = null;
		},
		[addUserCompany.rejected]: (state, action) => {
			state.isLoadingCompany = false;
			state.errorCompany = action.payload;
		},
		[addUserCompany.fulfilled]: (state, action) => {
			state.isLoadingCompany = false;
			state.errorCompany = null;
			state.company = action.payload.company;
		},
		// update company
		[updateUserCompany.pending]: (state) => {
			state.isLoadingCompany = true;
			state.errorCompany = null;
		},
		[updateUserCompany.rejected]: (state, action) => {
			state.isLoadingCompany = false;
			state.errorCompany = action.payload;
		},
		[updateUserCompany.fulfilled]: (state, action) => {
			state.isLoadingCompany = false;
			state.errorCompany = null;
			state.company = action.payload.company;
		},
		// delete company
		[deleteUserCompany.pending]: (state) => {
			state.isLoadingCompany = true;
			state.errorCompany = null;
		},
		[deleteUserCompany.rejected]: (state, action) => {
			state.isLoadingCompany = false;
			state.errorCompany = action.payload;
		},
		[deleteUserCompany.fulfilled]: (state, action) => {
			state.isLoadingCompany = false;
			state.errorCompany = null;
			state.company = action.payload;
		},
	},
});

// Actions
export const { logUserOut } = UserProfileSlice.actions;

// User Selectors
export const user = (state) => state.userProfile.user;
export const errorUser = (state) => state.userProfile.errorUser;
export const isLoadingUser = (state) => state.userProfile.isLoadingUser;
// Company Selectors
export const company = (state) => state.userProfile.company;
export const errorCompany = (state) => state.userProfile.errorCompany;
export const isLoadingCompany = (state) => state.userProfile.isLoadingCompany;

export default UserProfileSlice.reducer;
