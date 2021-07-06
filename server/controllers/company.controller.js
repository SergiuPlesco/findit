import Company from "../models/company.model.js";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

const company_register = async (req, res, next) => {
	const userID = req.params.userID;
	const user = await User.findOne({ _id: userID });
	if (!user) return res.status(404).json({ success: false, error: "Could not find the user." });
	const userCompany = user.company;

	if (userCompany)
		return res.status(409).json({
			success: false,
			error: `You can have only one company registered`,
		});
	const { name, city, address, contact, services, description } = req.body;

	try {
		const company = await Company.create({
			name,
			city,
			address,
			contact,
			services,
			description,
			user: userID,
		});
		await User.findByIdAndUpdate(userID, { company: company._id }, { new: true });
		return res.status(201).json({ success: true, message: "Company added successfuly", company });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: `Could not add company, ${error.message}` });
	}
};

const company_update_details = async (req, res) => {
	const userID = req.params.userID;
	try {
		const user = await User.findOne({ _id: userID });
		if (!user) return res.status(404).json({ success: false, error: "Could not find the user." });
		const company = await Company.findOneAndUpdate(
			{ _id: user.company },
			{
				$set: req.body,
			},
			{ new: true }
		);

		return res.status(200).json({ success: true, company });
	} catch (error) {
		return res.status(500).json({ success: false, errror: `Could not update, ${error.message}` });
	}
};

const company_delete = async (req, res) => {
	const userID = req.params.userID;
	try {
		const user = await User.findOne({ _id: userID });
		if (!user) return res.status(404).json({ success: false, error: "Could not find the user." });

		await Company.deleteOne({ _id: user.company });
		user.company = undefined;
		await user.save();
		return res.status(200).json({ success: true, message: "Company deleted.", user });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: `Could not delete company, ${error.message}` });
	}
};

export default {
	company_register,
	company_update_details,
	company_delete,
};
