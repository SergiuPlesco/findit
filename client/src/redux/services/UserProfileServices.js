import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getUser = createAsyncThunk(
	"userDetails/status",
	async ({ userID, token }, { rejectWithValue }) => {
		try {
			const result = await axios.get(`/users/${userID}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return result.data;
		} catch (error) {
			return rejectWithValue(error.response.data.error);
		}
	}
);

const updateUserInfo = createAsyncThunk(
	"userUpdate/status",
	async ({ userID, token, user }, { rejectWithValue }) => {
		try {
			const result = await axios.put(`/users/${userID}`, user, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return result.data;
		} catch (error) {
			return rejectWithValue(error.response.data.error);
		}
	}
);

const getUserCompany = createAsyncThunk(
	"getUserCompany/status",
	async ({ userID, token }, { rejectWithValue }) => {
		try {
			const result = await axios.get(`/users/${userID}/company`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return result.data;
		} catch (error) {
			return rejectWithValue(error.response.data.error);
		}
	}
);

const addUserCompany = createAsyncThunk(
	"addUserCompany/status",
	async ({ userID, token, company }, { rejectWithValue }) => {
		try {
			const result = await axios.post(`/users/${userID}/company`, company, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(result.data);
			return result.data;
		} catch (error) {
			return rejectWithValue(error.response.data.error);
		}
	}
);

const updateUserCompany = createAsyncThunk(
	"updateUserCompany/status",
	async ({ userID, token, company }, { rejectWithValue }) => {
		try {
			const result = await axios.put(`/users/${userID}/company`, company, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return result.data;
		} catch (error) {
			return rejectWithValue(error.response.data.error);
		}
	}
);

const deleteUserCompany = createAsyncThunk(
	"deleteUserCompany/status",
	async ({ userID, token }, { rejectWithValue }) => {
		try {
			const result = await axios.delete(`/users/${userID}/company`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return result.data;
		} catch (error) {
			return rejectWithValue(error.response.data.error);
		}
	}
);

export {
	getUser,
	updateUserInfo,
	getUserCompany,
	addUserCompany,
	updateUserCompany,
	deleteUserCompany,
};
