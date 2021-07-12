import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/AuthSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
	},
});

export default store;
