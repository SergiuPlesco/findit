import User from "../models/user.model.js";

const users_register = async (req, res) => {
	const { firstname, lastname, email, password } = req.body;

	try {
		const emailExist = await User.findOne({ email });
		if (emailExist)
			return res.status(409).json({ success: false, error: "Email already exists, findit" });
		User.create({
			firstname,
			lastname,
			email,
			password,
		});
		return res.status(201).json({ success: true, message: "User successfully created." });
	} catch (error) {
		return res.status(500).json({ success: false, error: error.message });
	}
};

const users_login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ success: false, error: "Provide email and password." });
	}

	try {
		const user = await User.findOne({ email }).select("+password");
		if (!user) {
			return res.status(409).json({ success: false, error: "Invalid Credentials" });
		}
		const isPasswordMatch = await user.matchPasswords(password);
		if (!isPasswordMatch) {
			return res.status(409).json({ success: false, error: "Invalid Credentials" });
		}
		sendLoginToken(user, 200, res);
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};

const sendLoginToken = (user, statusCode, res) => {
	const token = user.getSignedToken();

	res.status(statusCode).json({ success: true, token, id: user._id });
};
export default { users_register, users_login };
