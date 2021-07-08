import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CompanySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		contact: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		services: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

const Company = mongoose.model("Company", CompanySchema);

export default Company;
