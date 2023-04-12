import express from 'express'
import { getAllVinyls, getVinyl } from './vinyls.controler'

export const vinylsRouter = express.Router()

vinylsRouter.get('/products', getAllVinyls)
vinylsRouter.get('/products/:id', getVinyl)
