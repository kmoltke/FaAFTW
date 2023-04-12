import express from 'express'
import { createUser } from './users.controler'

export const usersRouter = express.Router()

usersRouter.post('/users', createUser)
