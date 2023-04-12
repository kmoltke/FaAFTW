import express from "express"
import { getAllVinyls, getVinylById } from "./vinyls.controller"

export const vinylsRouter = express.Router()

vinylsRouter.get("/products", getAllVinyls)
vinylsRouter.get("/products/:id", getVinylById)
