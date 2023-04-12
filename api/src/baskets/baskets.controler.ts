import { Request, Response } from 'express'
import { ModelManager } from '../model/model-manager'
import { Basket, BasketProduct } from './baskets.model'
import { User } from '../users/users.model'

const BASKETS_FILE = './data/baskets.json'
const USERS_FILE = './data/users.json'
const basketModelManager = new ModelManager<Basket>(BASKETS_FILE)
const basketProductModelManager = new ModelManager<BasketProduct>(BASKETS_FILE)
const userModelManager = new ModelManager<User>(USERS_FILE)

export const getAllBaskets = async (req: Request, res: Response) => {
  try {
    const baskets = (await basketModelManager.getAll()) as Basket[]
    res.json(baskets)
  } catch (error: any) {
    res.status(400).send(error.message)
  }
}

export async function getBasket(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.userId)
    const basket = await basketModelManager.getByID(userId)
    res.json(basket)
  } catch (err: any) {
    res.status(400).send(err.message)
  }
}

export async function addEmptyBasket(req: Request, res: Response) {
  try {
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

export async function removeBasket(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.userId)
    await basketModelManager.remove(userId)
    res.end('Basket successfully removed')
  } catch (error: any) {
    res.status(400).send(error.message)
  }
}

export async function addProductToBasket(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.userId)
    const product = req.body // product is sent as part of the body

    const basketsArray = await basketModelManager.getAll()
    // find basket
    const basketIndex = basketModelManager.findItem(basketsArray, userId)
    if (basketIndex === -1)
      throw new Error(`Basket for user ID:${userId} doesn't exist`)
    else {
      //find the products
      const productsArray = basketsArray[basketIndex].products
      const productIndex = basketProductModelManager.findItem(
        productsArray,
        product.id
      )

      // if product does not already exist in the basket, add a new one
      if (productIndex === -1) {
        productsArray.push(product)
      } else {
        //else update its quantity and price
        productsArray[productIndex].quantity += product.quantity
        productsArray[productIndex].price += product.price * product.quantity
      }

      //assign the new total to the "total" property of the basket
      basketsArray[basketIndex].total += product.price
      await basketModelManager.save(basketsArray)
    }

    res.end(`Basket for user "${userId}" was successfully updated.`)
  } catch (error: any) {
    res.status(400).send(error.message)
  }
}

export async function removeProductFromBasket(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.userId)
    const productId = parseInt(req.params.productId)

    const basketsArray = await basketModelManager.getAll()
    // find basket
    const basketIndex = basketModelManager.findItem(basketsArray, userId)
    if (basketIndex === -1)
      throw new Error(`Item with ID:${userId} doesn't exist`)
    else {
      //find the products in the basket
      const productsArray = basketsArray[basketIndex].products
      const productIndex = basketProductModelManager.findItem(
        productsArray,
        productId
      )
      if (productIndex === -1)
        throw new Error(`Item with ID:${productId} doesn't exist`)
      else {
        basketsArray[basketIndex].total -= productsArray[productIndex].price
        productsArray.splice(productIndex, 1)
      }
      await basketModelManager.save(basketsArray)
    }

    res.end(`Basket for user id "${userId}" was successfully updated.`)
  } catch (error: any) {
    res.status(400).send(error.message)
  }
}
