import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import dotenv from 'dotenv'
dotenv.config({path: 'C:/All/workspace/Projects/FINDIT/.env'})

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
