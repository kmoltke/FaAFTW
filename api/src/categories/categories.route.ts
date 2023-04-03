import express from "express";
import { getCategories, getSubcategories } from "./categories.controler";

export const categoriesRouter = express.Router();

categoriesRouter.get("/categories", getCategories);
categoriesRouter.get("/categories/:category", getSubcategories);
