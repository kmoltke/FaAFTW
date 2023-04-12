<<<<<<< HEAD
import express from "express"
import { getAllVinyls, getVinyl } from "./vinyls.controler"

export const vinylsRouter = express.Router()

vinylsRouter.get("/products", getAllVinyls)
vinylsRouter.get("/products/:id", getVinyl)
=======
import express from 'express'
import { addVinyl, getAllVinyls, getVinylById } from './vinyls.controler'

export const vinylsRouter = express.Router()

vinylsRouter.get('/products', getAllVinyls)
vinylsRouter.get('/products/:id', getVinylById)
vinylsRouter.post('/products', addVinyl)
>>>>>>> cc0ff2b0f509bd8803cf52b5c2d523e8c562de51
