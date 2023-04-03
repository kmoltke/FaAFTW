import {Request, Response} from 'express'
import {managerType, ModelManager} from "../model/model-manager";

export const getAllVinyls = async (req: Request, res: Response) => {
  try {
    const modelManager = new ModelManager(managerType.vinyls)
    const vinyls = await modelManager.getItemArray(managerType.vinyls)
    // res.send(basketData).status(200)
    res.json(vinyls)
  } catch (error) {
    // @ts-ignore
    res.status(404).send(error.message)
  }
}

// export const getAllVinyls = async (req: Request, res: Response) => {
//   try {
//     const vinylsData = await getAll()
//     res.send(vinylsData).status(200)
//   } catch (error) {
//     // @ts-ignore
//     res.status(404).send(error.message)
//   }
// }

// export const getVinylById = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params
//     const vinylData = await getById(+id)
//     res.send(vinylData).status(200)
//   } catch (error) {}
// }
