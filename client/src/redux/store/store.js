import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../slices/AuthSlice";
import cityReducer from "../slices/CitySlice";
import companyReducer from "../slices/CompanySlice";
import companiesByCategoryReducer from "../slices/CompaniesByCategorySlice";

const rootReducer = combineReducers({
	auth: authReducer,
	city: cityReducer,
	company: companyReducer,
	companiesByCategory: companiesByCategoryReducer,
});

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export default store;
