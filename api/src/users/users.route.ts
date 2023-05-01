import express from "express"
import {
  authenticateUser,
  createUser,
  getAllUsers,
  getUserById,
} from "./users.controller"

export const usersRouter = express.Router()

usersRouter.get("/users", getAllUsers)
usersRouter.get("/users/:id", getUserById)
usersRouter.post("/users", createUser)
usersRouter.post("/users/login", authenticateUser)
