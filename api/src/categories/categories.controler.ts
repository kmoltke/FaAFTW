import { Request, Response } from "express"
import { ModelManager, managerType } from "../model/model-manager"
import { category } from "./categories.model"

export async function getCategories(req: Request, res: Response) {
  try {
    const modelManager = new ModelManager(managerType.categories)
    const categories = (await modelManager.getItemArray(
      managerType.categories
    )) as category[]
    const result = categories.map((obj) => obj.categoryType)
    res.json(result)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}
export async function getSubcategories(req: Request, res: Response) {
  try {
    const modelManager = new ModelManager(managerType.categories)
    const categories = (await modelManager.getItemArray(
      managerType.categories
    )) as category[]
    const category = req.params.category
    const result = categories.find((obj) => obj.categoryType === category)
    if (result === undefined) {
      throw new Error("This category does not exist")
    } else {
      res.json(result.subcategories)
    }
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}
