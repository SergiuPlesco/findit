import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import store from "./redux/store/store";
import { Provider } from "react-redux";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
