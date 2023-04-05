import express from "express"
import { createUser } from "./users.controler"

export const userRouter = express.Router()

userRouter.post("/users", createUser)
