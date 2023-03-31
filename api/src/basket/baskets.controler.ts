import { Request, Response } from 'express'
import { findBasket, getAll } from './baskets.model'

export const getBaskets = async (req: Request, res: Response) => {
  try {
    const basketData = await getAll()
    res.send(basketData).status(200)
  } catch (error) {
    res.status(404).send(error.message)
  }
}

export const getBasketById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const basketData = await findBasket(+id)
    res.send(basketData).status(200)
  } catch (error) {}
}

