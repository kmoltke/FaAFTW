import express from 'express'
import {
  addBasketProduct,
  getBasket,
  postBasket,
  removeBasket,
  removeBasketProduct,
} from './baskets.controler'

export const basketsRouter = express.Router()

basketsRouter.post('/users/:userId/basket', postBasket) //Create a shopping basket for a specific user.

basketsRouter.get('/users/:userId/basket', getBasket) //get basket for a specific user

basketsRouter.put('/users/:userId/basket/products', addBasketProduct) //Put a product in the basket for a specific user.

basketsRouter.delete(
  '/users/:userId/basket/products/:productId',
  removeBasketProduct
) //remove a product from the basket for a specific user.

basketsRouter.delete('/users/:userId/basket', removeBasket)
