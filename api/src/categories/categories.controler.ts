import { Request, Response } from 'express'
import { getAll, getByName } from './categories.model'

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categoriesData = await getAll()
    res.send(categoriesData).status(200)
  } catch (error) {
    res.status(404).send(error.message)
  }
}

export const getCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params
    const categoryData = await getByName(category)
    res.send(categoryData).status(200)
  } catch {}
}
