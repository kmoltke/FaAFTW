import express from 'express'
import {getCategories} from "./categories.controler";

export const categoriesRouter = express.Router()

categoriesRouter.get('/categories', getCategories)
