import express from "express"
import { createUser } from "./users.controller"

export const usersRouter = express.Router()

usersRouter.post("/users", createUser)
