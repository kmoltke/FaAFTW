import express from 'express'
import { getBaskets, getBasketById } from './baskets.controler'

export const basketRouter = express.Router()

basketRouter.get('/baskets', getBaskets)
basketRouter.get('/baskets/:id', getBasketById)
// basketRouter.put('basket/:id',) // add an item to the shopping basket



