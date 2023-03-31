import express from 'express'
import { getBasket, postBasket } from './baskets.controler'

export const basketRouter = express.Router()

basketRouter.get('/baskets', getBasket)

basketRouter.post('/baskets', postBasket)
