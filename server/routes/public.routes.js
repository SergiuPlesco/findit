import express from "express";
const publicRouter = express.Router();
import publicController from "../controllers/public.controller.js";

publicRouter.get("/:city", publicController.getCityBrandsAndCategories);
publicRouter.get("/:city/brand/:brand", publicController.getCompanyDetails);
publicRouter.get("/:city/category/:category", publicController.getCompaniesByCategory);

export default publicRouter;
