import { Schema, Types, model } from "mongoose";

export type CompanyType = {
  name: string;
  city: string;
  address: string;
  contact: string;
  description: string;
  services: string;
  category: string;
  coverImage: URL;
  logoImage: URL;
  userId: Types.ObjectId;
};

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
    coverImage: {
      type: String,
    },
    logoImage: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Company = model<CompanyType>("Company", CompanySchema);

export default Company;
