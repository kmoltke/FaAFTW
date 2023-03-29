import { Request, Response } from 'express'
import { getAll } from './baskets.model'

export const getBasket = async (req: Request, res: Response) => {
  try {
    const basketData = await getAll()
    res.send(basketData).status(200)
  } catch (error) {
    res.status(404).send(error.message)
  }
}
