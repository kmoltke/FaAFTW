import { ErrorRequestHandler, Request, Response } from 'express'
import { getAll, getById } from './vinyls.model'
import * as customerModel from './vinyls.model'

//TODO: refactor all functions to either normal functions or arrow functions
export const getAllVinyls = async (req: Request, res: Response) => {
  try {
    const vinylsData = await getAll()
    res.send(vinylsData).status(200)
  } catch (error) {}
}

export const getVinylById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const vinylData = await getById(+id)
    res.send(vinylData).status(200)
  } catch (error) {}
}

export const addVinyl = async (req: Request, res: Response) => {
  try {
    const newVinyl = req.body
    customerModel.add(newVinyl)
    res.send(newVinyl).status(201)
  } catch (error) {}
}
