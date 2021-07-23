import Joi from "joi";

const customValidationErrorMessages = {
	messages: {
		"string.empty": "Field not allowed to be empty",
		"string.email": "Not a valid email",
		"string.min": "Password length must be at least 6 characters long",
		"any.only": "Passwords should match",
	},
};

// Registration Form
const registerForm = Joi.object({
	firstname: Joi.string().required(),
	lastname: Joi.string().required(),
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
	password: Joi.string().min(6).required(),
	repeat_password: Joi.ref("password"),
}).with("password", "repeat_password");

const isRegistrationValid = (user) => {
	try {
		const verifiedUser = registerForm.validate(user, customValidationErrorMessages);

		console.log("registration: ", verifiedUser);
		return verifiedUser;
	} catch (error) {
		// console.log("registration error: ", error);
		return error;
	}
};

// Login Form
const loginForm = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
	password: Joi.string().min(6).required(),
});

const isLoggingValid = (user) => {
	try {
		const verifiedUser = loginForm.validate(user, customValidationErrorMessages);
		return verifiedUser;
	} catch (error) {
		return error;
	}
};

// Forgot Password Form
const forgotPasswordForm = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
});

const isEmailValid = (userEmail) => {
	try {
		const verifiedEmail = forgotPasswordForm.validate(userEmail, customValidationErrorMessages);
		return verifiedEmail;
	} catch (error) {
		return error;
	}
};

// Reset Password Form
const resetPasswordForm = Joi.object({
	new_password: Joi.string().min(6).required(),
	repeat_new_password: Joi.ref("new_password"),
});
const isNewPasswordValid = (newPassword) => {
	try {
		const verifiedPassword = resetPasswordForm.validate(newPassword, customValidationErrorMessages);
		return verifiedPassword;
	} catch (error) {
		return error;
	}
};
export { isRegistrationValid, isLoggingValid, isEmailValid, isNewPasswordValid };
