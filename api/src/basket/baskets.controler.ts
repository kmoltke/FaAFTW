import {Request, Response} from 'express'
import * as basketModel from './baskets.model'
import {managerType, ModelManager} from "../model/model-manager";


export const getAllBaskets = async (req: Request, res: Response) => {
    try {
        const modelManager = new ModelManager(managerType.baskets)
        const baskets = await modelManager.getAll()
        // res.send(basketData).status(200)
        res.json(baskets)
    } catch (error) {
        // @ts-ignore
        res.status(404).send(error.message)
    }
}

export async function postBasket(req: Request, res: Response) {
    try {
        const modelManager = new ModelManager(managerType.baskets)
        let newBasket = req.body
        await modelManager.add(newBasket)
        res.end()
    } catch (err) {
        // @ts-ignore
        res.status(400).send(err.message)
    }
}

// export const getAllBaskets = async (req: Request, res: Response) => {
//   try {
//     const baskets = await basketModel.getAll()
//     // res.send(basketData).status(200)
//     res.json(baskets)
//   } catch (error) {
//     // @ts-ignore
//     res.status(404).send(error.message)
//   }
// }
//
// export async function postBasket(req: Request, res: Response) {
//   try {
//     let newBasket = req.body
//     await basketModel.add(newBasket)
//     res.end()
//   } catch (err) {
//     // @ts-ignore
//     res.status(400).send(err.message)
//   }
// }


// export const getAllBaskets = async (req: Request, res: Response) => {
//   try {
//     const baskets = await basketModel.getAll()
//     // res.send(basketData).status(200)
//     res.json(baskets)
//   } catch (error) {
//     // @ts-ignore
//     res.status(404).send(error.message)
//   }
// }
//
// export async function postBasket(req: Request, res: Response) {
//   try {
//     let newBasket = req.body
//     await basketModel.add(newBasket)
//     res.end()
//   } catch (err) {
//     // @ts-ignore
//     res.status(400).send(err.message)
//   }
// }