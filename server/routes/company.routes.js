import express from "express";
const companyRouter = express.Router();
import companyController from "../controllers/company.controller.js";
import authorize from "../middlewares/auth.middleware.js";

companyRouter.post("/users/:userID/company", authorize, companyController.company_register);
companyRouter.put("/users/:userID/company", authorize, companyController.company_update_details);
companyRouter.delete("/users/:userID/company", authorize, companyController.company_delete);

export default companyRouter;
