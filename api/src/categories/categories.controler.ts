import { Request, Response } from 'express'
import { ModelManager } from '../model/model-manager'
import { Category } from './categories.model'

const CATEGORY_FILE = './data/baskets.json'
const categoriesModelManager = new ModelManager<Category>(CATEGORY_FILE)

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoriesModelManager.getAll()
    const result = categories.map((obj) => obj.categoryType)
    res.json(result)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const getSubcategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoriesModelManager.getAll()
    const category = req.params.category
    const result = categories.find((obj) => obj.categoryType === category)
    if (result === undefined) {
      throw new Error('This category does not exist')
    } else {
      res.json(result.subcategories)
    }
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}
