import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import dotenv from "dotenv";
import store from "./redux/store/store";
import { Provider } from "react-redux";
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
dotenv.config({ path: "C:/All/workspace/Projects/FINDIT/.env" });

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
