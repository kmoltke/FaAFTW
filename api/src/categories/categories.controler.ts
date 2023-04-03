import {Request, Response} from 'express'
import {managerType, ModelManager} from "../model/model-manager";

export async function getByCategory(req: Request, res: Response) {
  try {
    const modelManager = new ModelManager(managerType.categories)
    let path = req.path
    let x = path.indexOf("/", 1)+1
    let y = path.indexOf("/", 12)
    let category: string = path.slice(x, y)
    let sub = req.params.sub
    const vinyls = await modelManager.getByCategory(category, sub)
    res.json(vinyls)
  } catch (err:any) {
    res.status(400).send(err.message)
  }
}








// export const getAllCategories = async (req: Request, res: Response) => {
//   try {
//     const categoriesData = await getAll()
//     res.send(categoriesData).status(200)
//   } catch (error) {
//     // @ts-ignore
//     const {message} = error;
//     res.status(404).send(message)
//   }
// }
//
// export const getCategory = async (req: Request, res: Response) => {
//   try {
//     const { category } = req.params
//     const categoryData = await getByName(category)
//     res.send(categoryData).status(200)
//   } catch (err) {
//     // @ts-ignore
//     res.status(404).send(err.message)
//   }
// }
