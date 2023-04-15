import { Request, Response } from "express"
import { ModelManager } from "../model/model-manager"
import { Category } from "./categories.model"
import { HttpError } from "../utils/http-errors"

const CATEGORY_FILE = "./data/categories.json"
const categoriesModelManager = new ModelManager<Category>(CATEGORY_FILE)

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoriesModelManager.getAll()
    const result = categories.map((obj) => obj.categoryType)
    res.json(result)
  } catch (error: any) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message)
    } else {
      res.status(500).send(error.message)
    }
  }
}

export const getSubcategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoriesModelManager.getAll()
    const category = req.params.category
    const result = categories.find((obj) => obj.categoryType === category)
    if (result === undefined) {
      throw new HttpError(404, "This category does not exist")
    } else {
      res.json(result.subcategories)
    }
  } catch (error: any) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message)
    } else {
      res.status(500).send(error.message)
    }
  }
}
