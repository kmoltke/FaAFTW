import { ErrorRequestHandler, Request, Response } from 'express'
import { getAll, getById } from './vinyls.model'

export const getAllVinyls = async (req: Request, res: Response) => {
  try {
    const vinylsData = await getAll()
    res.send(vinylsData).status(200)
  } catch (error) {
    // @ts-ignore
    res.status(404).send(error.message)
  }
}

export const getVinylById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const vinylData = await getById(+id)
    res.send(vinylData).status(200)
  } catch (error) {}
}
