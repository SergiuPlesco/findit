import express from "express";
const app = express();

app.listen(3001, (error) => {
	if (error) {
		console.log("An error has occured", error);
	}
	console.log("App listening on port 3001");
});
