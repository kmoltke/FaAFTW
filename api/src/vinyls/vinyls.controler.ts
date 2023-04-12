import { Request, Response } from 'express'
import { ModelManager } from '../model/model-manager'
import { Vinyl } from './vinyls.model'

const VINYLS_FILE = './data/vinyls.json'
const vinylsModelManager = new ModelManager<Vinyl>(VINYLS_FILE)

export const getAllVinyls = async (req: Request, res: Response) => {
  try {
    let allVinyls = await vinylsModelManager.getAll()

    const { genre, decades } = req.query

    if (genre) {
      allVinyls = allVinyls.filter((v) => v.genre === genre)
    }

    if (decades) {
      allVinyls = allVinyls.filter((v) => v.decade === decades)
    }

    if (allVinyls.length === 0) {
      res.end('No vinyls with provided categories')
    } else {
      let importants = vinylsModelManager.getImportants(allVinyls)
      res.json(importants)
    }
  } catch (error: any) {
    res.status(400).send(error.message)
  }
}

export async function getVinyl(req: Request, res: Response) {
  try {
    let id = parseInt(req.params.id)
    let vinyl = await vinylsModelManager.getByID(id)
    res.json(vinyl)
  } catch (err: any) {
    res.status(400).send(err.message)
  }
}
