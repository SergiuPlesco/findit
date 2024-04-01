import express from "express";
import companyController from "../controllers/company.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const companyRouter = express.Router();
companyRouter.get(
  "/users/:userID/company",
  authorize,
  companyController.company_details
);
companyRouter.post(
  "/users/:userID/company",
  authorize,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "logoImage", maxCount: 1 },
  ]),
  companyController.company_register
);
companyRouter.put(
  "/users/:userID/company",
  authorize,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "logoImage", maxCount: 1 },
  ]),
  companyController.company_update_details
);
companyRouter.delete(
  "/users/:userID/company",
  authorize,
  companyController.company_delete
);

export default companyRouter;
