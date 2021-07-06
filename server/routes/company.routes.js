import express from "express";
const companyRouter = express.Router();
import companyController from "../controllers/company.controller.js";

companyRouter.post("/users/:userID/company", companyController.company_register);
companyRouter.put("/users/:userID/company", companyController.company_update_details);
companyRouter.delete("/users/:userID/company", companyController.company_delete);

export default companyRouter;
