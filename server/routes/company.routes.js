import express from "express";
const companyRouter = express.Router();

companyRouter.get("/companies/:companyID");
companyRouter.get("/companies/all");
companyRouter.post("/companies/add");
companyRouter.put("/companies/:companyID");
companyRouter.delete("companies/:companyID");

export default companyRouter;
