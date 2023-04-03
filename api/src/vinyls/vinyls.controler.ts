import {Request, Response} from 'express'
import {managerType, ModelManager} from "../model/model-manager";
import {vinyl} from "./vinyls.model";

export const getAllVinyls = async (req: Request, res: Response) => {
  try {
    const modelManager = new ModelManager(managerType.vinyls)

    let allVinyls = await modelManager.getItemArray(managerType.vinyls)

    let {genre, decades} = req.query

    if (genre) {
      allVinyls = (allVinyls as vinyl[]).filter((v) => v.genre === genre)
    }

    if (decades) {
      allVinyls = (allVinyls as vinyl[]).filter((v) => v.decade === decades)
    }

    if (allVinyls.length === 0) {
      res.end("No vinyls with provided categories")
    }

    let importants = modelManager.getImportants((allVinyls as vinyl[]))

    res.json(importants)


  } catch (error:any) {
    res.status(400).send(error.message)
  }
}

export async function getVinyl(req: Request, res: Response) {
  try {
    const modelManager = new ModelManager(managerType.vinyls)
    let id = parseInt(req.params.id)
    let vinyl = await modelManager.getByID(id)
    res.json(vinyl)
  } catch (err:any) {
    res.status(400).send(err.message)
  }
}
