import {Request, Response} from 'express'
import {managerType, ModelManager} from "../model/model-manager";


export const getAllBaskets = async (req: Request, res: Response) => {
    try {
        const modelManager = new ModelManager(managerType.baskets)
        const baskets = await modelManager.getItemArray(managerType.baskets)
        res.json(baskets)
    } catch (error:any) {
        res.status(400).send(error.message)
    }
}

export async function getBasket(req: Request, res: Response) {
    try {
        const modelManager = new ModelManager(managerType.baskets)
        let id = parseInt(req.params.id)
        // ***
        // Experiment to extract type from the url in order to refactor the controllers by the type
        let path = req.path
        let type = path.slice(1, path.indexOf("/", 2))
        // ***
        let basket = await modelManager.getByID(id)
        res.json(basket)
    } catch (err:any) {
        res.status(400).send(err.message)
    }
}

export async function postBasket(req: Request, res: Response) {
    try {
        const modelManager = new ModelManager(managerType.baskets)
        let newBasket = req.body
        await modelManager.add(newBasket)
        res.end("Item created successfully")
    } catch (err:any) {
        res.status(400).send(err.message)
    }
}

export async function updateBasket(req: Request, res: Response) {
    try {
        const modelManager = new ModelManager(managerType.baskets)
        let id = parseInt(req.params.id)
        let newBasket = req.body
        await modelManager.update(id, newBasket)
        res.end(`Basket with ${id} was successfully updated`)
    } catch (error:any) {
        res.status(400).send(error.message);
    }
}

export async function removeBasket(req: Request, res: Response) {
    try {
        let modelMgr = new ModelManager(managerType.baskets);
        let id = parseInt(req.params.id)
        await modelMgr.remove(id);
        res.end("Basket successfully removed");
    } catch (error:any) {
        res.status(400).send(error.message);
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