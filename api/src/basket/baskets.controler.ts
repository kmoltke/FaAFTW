import { Request, Response } from 'express'
import * as basketModel from './baskets.model'

export const getBasket = async (req: Request, res: Response) => {
  try {
    const basketData = await basketModel.getAll()
    res.send(basketData).status(200)
  } catch (error) {
    // @ts-ignore
    res.status(404).send(error.message)
  }
}

export async function postBasket(req: Request, res: Response) {
  try {
    let newBasket = req.body
    await basketModel.add(newBasket)
    res.end()
  } catch (err) {
    // @ts-ignore
    res.status(400).send(err.message)
  }
}