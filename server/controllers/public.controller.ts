import Company from "../models/company.model.js";
import type { Request, Response } from "express";
const getCityBrandsAndCategories = async (req: Request, res: Response) => {
  let filters = { city: "" };
  const city = req.params.city;
  if (city) filters.city = city;

  try {
    const companies = await Company.find(filters);
    const brands = companies.map((company) => {
      return {
        id: company._id,
        name: company.name,
        category: company.category,
        logoImage: company.logoImage,
      };
    });
    const categories = companies.map((company) => company.category);

    return res.status(200).json({ city, brands, categories });
  } catch (error: any) {
    if (error && error.message) {
      return res.status(500).json({ error: error.message });
    }
  }
};

const getCompanyDetails = async (req: Request, res: Response) => {
  const city = req.params.city;
  const brand = req.params.brand;
  try {
    const company = await Company.findOne({
      city: { $regex: city, $options: "i" },
      name: { $regex: brand, $options: "i" },
    });
    return res.status(200).json(company);
  } catch (error: any) {
    if (error && error.message) {
      return res.status(404).json({
        success: false,
        error: `Could not find the company you looking for. ${error.message}`,
      });
    }
  }
};

const getCompaniesByCategory = async (req: Request, res: Response) => {
  const city = req.params.city;
  const category = req.params.category;

  if (!city || !category) {
    return res.status(404).json({ success: false, error: "Bad request." });
  }

  try {
    const companiesByCategory = await Company.find({
      city: { city: city, $options: "i" },
      category: {
        category: category,
        $options: "i",
      },
    });
    return res.status(200).json(companiesByCategory);
  } catch (error: any) {
    if (error && error.message) {
      return res.status(500).json({
        success: false,
        error: `Could not retrieve categories. ${error.message}`,
      });
    }
  }
};

export default {
  getCityBrandsAndCategories,
  getCompanyDetails,
  getCompaniesByCategory,
};
