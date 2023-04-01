import express from 'express'
import { getAllBaskets, postBasket } from './baskets.controler'

export const basketRouter = express.Router()

basketRouter.use(express.json())

basketRouter.get('/baskets', getAllBaskets)

basketRouter.post('/baskets', postBasket)
