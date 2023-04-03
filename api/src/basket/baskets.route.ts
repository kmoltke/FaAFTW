import express from 'express'
import {getAllBaskets, postBasket, removeBasket} from './baskets.controler'

export const basketRouter = express.Router()

basketRouter.use(express.json())

basketRouter.get('/baskets', getAllBaskets)

basketRouter.post('/baskets', postBasket)

basketRouter.delete('/baskets/:id', removeBasket)
