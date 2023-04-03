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
