import express from 'express'
import {getByCategory} from "./categories.controler";

export const categoriesRouter = express.Router()

// categoriesRouter.get('/categories', getAllCategories)
categoriesRouter.get('/categories/genre/:sub', getByCategory)
categoriesRouter.get('/categories/decades/:sub', getByCategory)
