import Company from "../models/company.model.js";
import User from "../models/user.model.js";
import type { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

const company_details = async (req: Request, res: Response) => {
  const userID = req.params.userID;
  try {
    const user = await User.findOne({ _id: userID });
    if (!user)
      return res
        .status(404)
        .json({ success: false, error: "Could not find the user." });
    if (user?.companyId) {
      const company = await Company.findOne({ _id: user.companyId });
      return res.status(200).json({ success: true, company });
    }
  } catch (error: any) {
    if (error && error.message) {
      return res
        .status(500)
        .json({ success: false, error: `${error.message}` });
    }
  }
};

const company_register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const userID = req.params.userID;
  const user = await User.findOne({ _id: userID });
  if (!user)
    return res
      .status(404)
      .json({ success: false, error: "Could not find the user." });
  const userCompany = user.companyId;

  if (userCompany)
    return res.status(409).json({
      success: false,
      error: `You can have only one company registered`,
    });
  const { name, city, category, address, contact, services, description } =
    req.body;

  try {
    const company = await Company.create({
      name,
      city,
      category,
      address,
      contact,
      services,
      description,
      coverImage: files["coverImage"]
        ? `${files["coverImage"][0]?.originalname}`
        : "",
      logoImage: files["logoImage"]
        ? `${files["logoImage"][0]?.originalname}`
        : "",
      user: userID,
    });

    await User.findByIdAndUpdate(
      userID,
      { company: company._id },
      { new: true }
    );
    return res
      .status(201)
      .json({ success: true, message: "Company added successfuly", company });
  } catch (error: any) {
    if (error && error.message) {
      return res.status(500).json({
        success: false,
        error: `Could not add company, ${error.message}`,
      });
    }
  }
};

const company_update_details = async (req: Request, res: Response) => {
  // const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const userID = req.params.userID;

  try {
    const user = await User.findOne({ _id: userID });
    if (!user)
      return res
        .status(404)
        .json({ success: false, error: "Could not find the user." });
    const company = await Company.findOneAndUpdate(
      { _id: user.companyId },
      {
        $set: {
          ...req.body,
          // coverImage: files["coverImage"]
          //   ? `${files["coverImage"][0]?.filename}`
          //   : req.body.coverImage,
          // logoImage: files["logoImage"]
          //   ? `${files["logoImage"][0]?.filename}`
          //   : req.body.logoImage,
        },
      },
      { new: true }
    );
    return res.status(200).json({ success: true, company });
  } catch (error: any) {
    if (error && error.message) {
      return res
        .status(500)
        .json({ success: false, errror: `Could not update, ${error.message}` });
    }
  }
};

const company_delete = async (req: Request, res: Response) => {
  const userID = req.params.userID;
  try {
    const user = await User.findOne({ _id: userID });
    if (!user)
      return res
        .status(404)
        .json({ success: false, error: "Could not find the user." });

    await Company.deleteOne({ _id: user.companyId });
    user.companyId = undefined;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Company deleted.", user });
  } catch (error: any) {
    if (error && error.message) {
      return res.status(500).json({
        success: false,
        error: `Could not delete company, ${error.message}`,
      });
    }
  }
};

export default {
  company_details,
  company_register,
  company_update_details,
  company_delete,
};
