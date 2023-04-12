import express from 'express'
import {
  addEmptyBasket,
  addProductToBasket,
  getBasket,
  removeBasket,
  removeProductFromBasket,
} from './baskets.controler'

export const basketsRouter = express.Router()

basketsRouter.get('/users/:userId/basket', getBasket) //get basket for a specific user

basketsRouter.post('/users/:userId/basket', addEmptyBasket) //Create an empty shopping basket for a specific user.

basketsRouter.put('/users/:userId/basket/products', addProductToBasket) //Put a product in the basket for a specific user.

basketsRouter.delete(
  '/users/:userId/basket/products/:productId',
  removeProductFromBasket
) //remove a product from the basket for a specific user.

basketsRouter.delete('/users/:userId/basket', removeBasket)
