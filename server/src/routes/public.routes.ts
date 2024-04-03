import express from "express";
const publicRouter = express.Router();
import publicController from "../controllers/public.controller.js";

publicRouter.get("/:city", publicController.getCityBrandsAndCategories);
publicRouter.get("/:city/brand/:brand", publicController.getCompanyDetails); // "/:city/brand?brand=Tectabi"
publicRouter.get("/:city/category/:category", publicController.getCompaniesByCategory); // "/:city/category?category="

export default publicRouter;
