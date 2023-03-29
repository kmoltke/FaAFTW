import express from 'express'
import { getAllCategories, getCategory } from './categories.controler'

export const categoriesRouter = express.Router()

categoriesRouter.get('/categories', getAllCategories)
categoriesRouter.get('/categories/:category', getCategory)
