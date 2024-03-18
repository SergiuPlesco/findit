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
  extraReducers: (builder) => {
    // get user
    builder.addCase(getUser.pending, (state) => {
      state.user = undefined;
      state.errorUser = null;
      state.isLoadingUser = true;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.user = undefined;
      state.errorUser = action.payload;
      state.isLoadingUser = false;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.errorUser = null;
      state.isLoadingUser = false;
    });
    // update user
    builder.addCase(updateUserInfo.pending, (state) => {
      state.isLoading = true;
      state.errorUser = null;
    });
    builder.addCase(updateUserInfo.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoadingUser = false;
    });
    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoadingUser = false;
      state.errorUser = null;
    });
    // get company
    builder.addCase(getUserCompany.pending, (state) => {
      state.company = undefined;
      state.isLoadingCompany = true;
    });
    builder.addCase(getUserCompany.rejected, (state, action) => {
      state.company = undefined;
      state.errorCompany = action.payload;
      state.isLoadingCompany = false;
    });
    builder.addCase(getUserCompany.fulfilled, (state, action) => {
      state.company = action.payload.company;
      state.errorCompany = null;
      state.isLoadingCompany = false;
    });
    // add company
    builder.addCase(addUserCompany.pending, (state) => {
      state.isLoadingCompany = true;
      state.errorCompany = null;
    });
    builder.addCase(addUserCompany.rejected, (state, action) => {
      state.isLoadingCompany = false;
      state.errorCompany = action.payload;
    });
    builder.addCase(addUserCompany.fulfilled, (state, action) => {
      state.isLoadingCompany = false;
      state.errorCompany = null;
      state.company = action.payload.company;
    });
    // update company
    builder.addCase(updateUserCompany.pending, (state) => {
      state.isLoadingCompany = true;
      state.errorCompany = null;
    });
    builder.addCase(updateUserCompany.rejected, (state, action) => {
      state.isLoadingCompany = false;
      state.errorCompany = action.payload;
    });
    builder.addCase(updateUserCompany.fulfilled, (state, action) => {
      state.isLoadingCompany = false;
      state.errorCompany = null;
      state.company = action.payload.company;
    });
    // delete company
    builder.addCase(deleteUserCompany.pending, (state) => {
      state.isLoadingCompany = true;
      state.errorCompany = null;
    });
    builder.addCase(deleteUserCompany.rejected, (state, action) => {
      state.isLoadingCompany = false;
      state.errorCompany = action.payload;
    });
    builder.addCase(deleteUserCompany.fulfilled, (state, action) => {
      state.isLoadingCompany = false;
      state.errorCompany = null;
      state.company = action.payload;
    });
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
