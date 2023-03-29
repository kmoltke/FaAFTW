import express from 'express'
import { getBasket } from './baskets.controler'

export const basketRouter = express.Router()

basketRouter.get('/baskets', getBasket)

