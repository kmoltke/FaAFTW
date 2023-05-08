import { Request, Response } from 'express'
import { ModelManager } from '../model/model-manager'
import { Basket, BasketProduct } from './baskets.model'
import { User } from '../users/users.model'
import { HttpError } from '../utils/http-errors'

const BASKETS_FILE = './data/baskets.json'
const USERS_FILE = './data/users.json'
const basketModelManager = new ModelManager<Basket>(BASKETS_FILE)
const basketProductModelManager = new ModelManager<BasketProduct>(BASKETS_FILE)
const userModelManager = new ModelManager<User>(USERS_FILE)

/**
 * Gets all baskets
 * @param req
 * @param res
 * @throws HttpError
 */
export const getAllBaskets = async (req: Request, res: Response) => {
  try {
    const baskets = await basketModelManager.getAll()
    res.json(baskets)
  } catch (error: any) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message)
    } else {
      res.status(500).send(error.message)
    }
  }
}

/**
 * Gets basket by user ID
 * @param req
 * @param res
 * @throws HttpError
 */
export const getBasketById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
    await userModelManager.getByID(userId)
    const basket = await basketModelManager.getByID(userId)
    res.json(basket)
  } catch (error: any) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message)
    } else {
      res.status(500).send(error.message)
    }
  }
}

/**
 * Creates an empty basket for a user
 * @param req
 * @param res
 * @throws HttpError
 */
export const addEmptyBasket = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
    await userModelManager.getByID(userId)

    const newBasket = {
      id: userId,
      BasketId: Date.now(),
      products: [],
      total: 0,
    }
    await basketModelManager.add(newBasket)
    res.status(201).send('Basket created successfully')
  } catch (error: any) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message)
    } else {
      res.status(500).send(error.message)
    }
  }
}

/**
 * Removes an entire basket for a specific user
 * @param req
 * @param res
 * @throws HttpError
 */
export const removeBasket = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
    await userModelManager.getByID(userId)
    await basketModelManager.remove(userId)
    res.send('Basket successfully removed')
  } catch (error: any) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message)
    } else {
      res.status(500).send(error.message)
    }
  }
}

/**
 * Adds a product to a specific basket
 * @param req - contains product in json
 * @param res
 * @throws HttpError
 */
export const addProductToBasket = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
    await userModelManager.getByID(userId) // Will throw user error if user does not exist
    const product = req.body // product is sent as part of the body

    const basketsArray = await basketModelManager.getAll()
    // find basket
    const basketIndex = basketModelManager.findItem(basketsArray, userId)
    if (basketIndex === -1)
      throw new HttpError(404, `Basket for user "${userId}" doesn't exist`)
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

    res.send(`Basket for user "${userId}" was successfully updated.`)
  } catch (error: any) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message)
    } else {
      res.status(500).send(error.message)
    }
  }
}

/**
 * Removes a specific product from a specific basket.
 * @param req
 * @param res
 * @throws HttpError
 */
export const removeProductFromBasket = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
    await userModelManager.getByID(userId)
    const productId = parseInt(req.params.productId)

    const basketsArray = await basketModelManager.getAll()
    // find basket
    const basketIndex = basketModelManager.findItem(basketsArray, userId)
    if (basketIndex === -1)
      throw new HttpError(404, `Basket with ID:${userId} doesn't exist`)
    else {
      //find the products in the basket
      const productsArray = basketsArray[basketIndex].products
      const productIndex = basketProductModelManager.findItem(
        productsArray,
        productId
      )
      if (productIndex === -1)
        throw new HttpError(
          404,
          `Product with ID:${productId} doesn't exist in the basket for user "${userId}"`
        )
      else {
        //Decrement if quantity is > 1 otherwise delete
        basketsArray[basketIndex].total -=
          productsArray[productIndex].price /
          productsArray[productIndex].quantity
        productsArray[productIndex].price -=
          productsArray[productIndex].price /
          productsArray[productIndex].quantity

        productsArray[productIndex].quantity === 1
          ? productsArray.splice(productIndex, 1)
          : (productsArray[productIndex].quantity -= 1)
      }
      await basketModelManager.save(basketsArray)
    }

    res.send(`Basket for user "${userId}" was successfully updated.`)
  } catch (error: any) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message)
    } else {
      res.status(500).send(error.message)
    }
  }
}
