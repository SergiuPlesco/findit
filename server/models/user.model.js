import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Please provide a valid email",
		],
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		select: false,
	},
	companies: [
		{
			type: Schema.Types.ObjectId,
			ref: "Company",
		},
	],
});

const User = mongoose.model("User", UserSchema);
export default User;
