import express from 'express'
import { createUser, getAllUsers } from './users.controller'

export const usersRouter = express.Router()

usersRouter.get('/users', getAllUsers)
usersRouter.post('/users', createUser)
