import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
	const userID = req.params.userID;
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		token = req.headers.authorization.split(" ")[1];
	}
	if (!token) {
		return res
			.status(401)
			.json({ succes: false, error: "Not authorized to access this route. Login or register." });
	}
	try {
		const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
		console.log(verifiedToken);
		if (userID !== verifiedToken.id)
			return res
				.status(401)
				.json({ success: false, error: "Not authorized. Different ID. Login or Register." });

		const user = await User.findOne({ _id: verifiedToken.id });
		if (!user)
			return res
				.status(404)
				.json({ success: false, error: "User not found with the id provided. Login or Register." });

		next();
	} catch (error) {
		return res.status(401).json({ success: false, error: `Error authorizing, ${error.message}` });
	}
};

export default authorize;
