import express from "express"
import { getAllVinyls, getVinylById } from "./vinyls.controller"

export const vinylsRouter = express.Router()

vinylsRouter.get("/products", getAllVinyls)     //get all vinyls or filter by category
vinylsRouter.get("/products/:id", getVinylById) //get single vinyl
