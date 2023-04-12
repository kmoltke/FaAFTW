import express from 'express'
import { getBaskets, getBasketById } from './baskets.controler'

export const basketsRouter = express.Router()

basketsRouter.get('/baskets', getBaskets)
basketsRouter.get('/baskets/:id', getBasketById)
// basketRouter.put('basket/:id',) // add an item to the shopping basket
