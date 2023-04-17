import express from "express"
import { getCategories, getSubcategories } from "./categories.controller"

export const categoriesRouter = express.Router()

categoriesRouter.get("/categories", getCategories)  //all categories
categoriesRouter.get("/categories/:category", getSubcategories) //subcategories
