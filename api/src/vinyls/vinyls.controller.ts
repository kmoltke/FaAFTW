import { Request, Response } from 'express'
import { ModelManager } from '../model/model-manager'
import { Vinyl } from './vinyls.model'
import { HttpError } from '../utils/http-errors'

const VINYLS_FILE = './data/vinyls.json'
const vinylsModelManager = new ModelManager<Vinyl>(VINYLS_FILE)

/**
 * Gets most important information (e.i. album, artist & price) for all vinyls in the catalogue.
 * If a query parameter with a category is provided, the getAllVinyls will filter by the specific category.
 * @param req - optional category in query parameter
 * @param res
 */
export const getAllVinyls = async (req: Request, res: Response) => {
  try {
    let allVinyls = await vinylsModelManager.getAll()

    const { genre, decade, artist } = req.query

    if (genre) {
      allVinyls = allVinyls.filter((v) => v.genre === genre)
    }

    if (decade) {
      allVinyls = allVinyls.filter((v) => v.decade === decade)
    }

    if (artist) {
      allVinyls = allVinyls.filter((v) => v.artist === artist)
    }

    if (allVinyls.length === 0) {
      res.status(204).send('No vinyls with provided categories')
    } else {
      let importants = getImportants(allVinyls)
      res.json(importants)
    }
  } catch (error: any) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message)
    } else {
      res.status(500).send(error.message)
    }
  }
}

/**
 * Gets all information for a specific vinyl
 * @param req
 * @param res
 * @throws HttpError if vinyl does not exist
 */
export const getVinylById = async (req: Request, res: Response) => {
  try {
    let id = parseInt(req.params.id)
    let vinyl = await vinylsModelManager.getByID(id)
    res.json(vinyl)
  } catch (error: any) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message)
    } else {
      res.status(500).send(error.message)
    }
  }
}

/**
 * Helper function to return only specified important information.
 * @param vinyls
 */
const getImportants = (vinyls: Vinyl[]) => {
  return vinyls.map((v) => ({
    id: v.id,
    album: v.album,
    artist: v.artist,
    price: v.price,
    image: v.image,
  }))
}
