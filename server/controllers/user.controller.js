import User from "../models/user.model.js";

const user_account_details = async (req, res) => {
	const userID = req.params.userID;
	try {
		const user = await User.findOne({ _id: userID });
		if (!user) return res.status(404).json({ success: false, error: "User not found with." });
		return res.status(200).json({ success: true, user });
	} catch (error) {
		return res.status(500).json({ success: false, error: error.message });
	}
};

const user_account_update_details = async (req, res) => {
	const userID = req.params.userID;
	const { firstname, lastname, email } = req.body;
	try {
		const user = await User.findOne({ _id: userID });
		if (!user) return res.status(404).json({ success: false, error: "User not found" });
		if (firstname && user.firstname !== firstname) user.firstname = firstname;
		if (lastname && user.lastname !== lastname) user.lastname = lastname;
		if (email && user.email !== email) user.email = email;

		await user.save();
		return res.status(200).json({ success: true, message: "Changes have been saved.", user });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: `Could not save changes, ${error.message}` });
	}
};

const user_account_delete = async (req, res) => {
	const userID = req.params.userID;
	try {
		await User.deleteOne({ _id: userID });
		return res.status(200).json({ success: true, message: "Account deleted successfuly." });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: `Could not delete account, ${error.message}` });
	}
};

export default {
	user_account_details,
	user_account_update_details,
	user_account_delete,
};
