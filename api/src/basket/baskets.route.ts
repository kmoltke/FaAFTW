import express from 'express'
import {getAllBaskets, getBasket, postBasket, removeBasket, updateBasket} from './baskets.controler'

export const basketRouter = express.Router()

basketRouter.use(express.json())

basketRouter.get('/baskets', getAllBaskets)

basketRouter.get('/baskets/:id', getBasket)

basketRouter.post('/baskets', postBasket)

basketRouter.put('/baskets/:id', updateBasket)

basketRouter.delete('/baskets/:id', removeBasket)
