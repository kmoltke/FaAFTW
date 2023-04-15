import { Request, Response } from "express"
import { ModelManager } from "../model/model-manager"
import { Vinyl } from "./vinyls.model"
import { HttpError } from "../utils/http-errors"

const VINYLS_FILE = "./data/vinyls.json"
const vinylsModelManager = new ModelManager<Vinyl>(VINYLS_FILE)

export const getAllVinyls = async (req: Request, res: Response) => {
  try {
    let allVinyls = await vinylsModelManager.getAll()

    const { genre, decades, artist } = req.query

    if (genre) {
      allVinyls = allVinyls.filter((v) => v.genre === genre)
    }

    if (decades) {
      allVinyls = allVinyls.filter((v) => v.decade === decades)
    }

    if (artist) {
      allVinyls = allVinyls.filter((v) => v.artist === artist)
    }

    if (allVinyls.length === 0) {
      res.status(204).send("No vinyls with provided categories")
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

const getImportants = (vinyls: Vinyl[]) => {
  return vinyls.map((v) => ({
    album: v.album,
    artist: v.artist,
    price: v.price,
  }))
}
