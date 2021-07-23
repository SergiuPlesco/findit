import User from "../models/user.model.js";
import sendMail from "../utils/sendMail.js";
import crypto from "crypto";

const users_register = async (req, res) => {
	const { firstname, lastname, email, password } = req.body;

	try {
		const emailExist = await User.findOne({ email });
		if (emailExist)
			return res.status(409).json({ success: false, error: "Email already exists, findit" });

		await User.create({
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

const users_forgotpassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ succes: false, error: "Could not find the user with email" });
		}
		const resetToken = user.getResetPasswordToken();
		await user.save();
		const resetUrl = `http://localhost:3000/users/resetpassword/${resetToken}`;
		const message = `
			<h1>You have requested a password reset</h1>
			<p>Please follow the link below:</p>
			<a href=${resetUrl} clicktracking=off>${resetUrl}</a>
		`;
		try {
			await sendMail({
				to: user.email,
				subject: "Reset password",
				text: message,
			});
			return res.status(200).json({ success: true, message: "Email has been sent" });
		} catch (error) {
			user.resetPasswordToken = undefined;
			user.resetPasswordExpire = undefined;
			await user.save();
			return res
				.status(500)
				.json({ success: false, error: `Email could not be sent ${error.message}` });
		}
	} catch (error) {
		return res.status(500).json({ success: false, error: error.message });
	}
};

const users_resetpassword = async (req, res) => {
	console.log(req.params.resetToken);
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(req.params.resetToken)
		.digest("hex");
	console.log("Reset pass: ", resetPasswordToken);
	try {
		const user = await User.findOne({
			resetPasswordToken,
			resetPasswordExpire: { $gt: Date.now() },
		});
		if (!user) {
			return res.status(401).json({ success: false, error: "Invalid or expired reset token" });
		}
		user.password = req.body.new_password;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;
		await user.save();
		return res.status(201).json({ success: true, message: "Password reset succesfuly" });
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
};

const sendLoginToken = (user, statusCode, res) => {
	const token = user.getSignedToken();

	res.status(statusCode).json({ success: true, token, id: user._id });
};
export default { users_register, users_login, users_forgotpassword, users_resetpassword };
