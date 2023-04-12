import { Request, Response } from 'express'
import { managerType, ModelManager } from '../model/model-manager'
import { CLIENT_RENEG_LIMIT } from 'tls'
import { log } from 'console'

export const getAllBaskets = async (req: Request, res: Response) => {
  try {
    const modelManager = new ModelManager(managerType.baskets)
    const baskets = await modelManager.getItemArray(managerType.baskets)
    res.json(baskets)
  } catch (error: any) {
    res.status(400).send(error.message)
  }
}

export async function getBasket(req: Request, res: Response) {
  try {
    const modelManager = new ModelManager(managerType.baskets)
    let id = parseInt(req.params.userId)
    let basket = await modelManager.getByID(id)
    res.json(basket)
  } catch (err: any) {
    res.status(400).send(err.message)
  }
}

export async function postBasket(req: Request, res: Response) {
  try {
    const basketModelManager = new ModelManager(managerType.baskets)
    const userModelManager = new ModelManager(managerType.users)
    const userId = parseInt(req.params.userId)
    userModelManager.getByID(userId)
    const newBasket = {
      id: userId,
      BasketId: Date.now(),
      products: [],
      total: 0,
    }
    await basketModelManager.add(newBasket)
    res.end('Basket created successfully')
  } catch (error: any) {
    res.status(400).send(error.message)
  }
}

// export async function updateBasket(req: Request, res: Response) {
//   try {
//     const modelManager = new ModelManager(managerType.baskets)
//     let id = parseInt(req.params.id)
//     let newBasket = req.body
//     await modelManager.update(id, newBasket)
//     res.end(`Basket with ${id} was successfully updated`)
//   } catch (error: any) {
//     res.status(400).send(error.message)
//   }
// }

export async function removeBasket(req: Request, res: Response) {
  try {
    let modelMgr = new ModelManager(managerType.baskets)
    let id = parseInt(req.params.userId)
    await modelMgr.remove(id)
    res.end('Basket successfully removed')
  } catch (error: any) {
    res.status(400).send(error.message)
  }
}

export async function addBasketProduct(req: Request, res: Response) {
  try {
    const modelManager = new ModelManager(managerType.baskets)
    let userId = parseInt(req.params.userId)
    let product = req.body // product is sent as part of the body
    await modelManager.addBasketProduct(userId, product)
    res.end(`Basket for user "${userId}" was successfully updated.`)
  } catch (error: any) {
    res.status(400).send(error.message)
  }
}

export async function removeBasketProduct(req: Request, res: Response) {
  try {
    const modelManager = new ModelManager(managerType.baskets)
    let userId = parseInt(req.params.userId)
    let productId = parseInt(req.params.productId)
    await modelManager.removeBasketProduct(userId, productId)
    res.end(`Basket for user id "${userId}" was successfully updated.`)
  } catch (error: any) {
    res.status(400).send(error.message)
  }
}
