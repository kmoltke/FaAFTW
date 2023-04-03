import {Request, Response} from 'express'
import {managerType, ModelManager} from "../model/model-manager";

export async function getCategories(req: Request, res: Response) {
  try {
    let modelManager = new ModelManager(managerType.categories)
    let categories = await modelManager.getItemArray(managerType.categories)
    res.json(categories)
  } catch (e:any) {
    res.status(400).send(e.message)
  }
}
