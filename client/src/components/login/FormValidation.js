import Joi from "joi";

const registerForm = Joi.object({
	firstname: Joi.string().required(),
	lastname: Joi.string().required(),
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
	password: Joi.string().min(6).required(),
	repeat_password: Joi.ref("password"),
}).with("password", "repeat_password");

const customValidationErrorMessages = {
	messages: {
		"string.empty": "Field not allowed to be empty",
		"string.email": "Not a valid email",
		"string.min": "Password length must be at least 6 characters long",
		"any.only": "Passwords should match",
	},
};

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

export { isRegistrationValid, isLoggingValid };
