import { Request, Response } from "express"
import { ModelManager } from "../model/model-manager"
import { User } from "./users.model"
import { HttpError } from "../utils/http-errors"

const USERS_FILE = "./data/users.json"
const usersModelManager = new ModelManager<User>(USERS_FILE)

/**
 * gets all users
 */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await usersModelManager.getAll()
    console.log("all users:", allUsers)
    res.status(200).send(allUsers)
  } catch (error: any) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message)
    } else {
      res.status(500).send(error.message)
    }
  }
}

/**
 * Creates a user
 * @param req - User information
 * @param res
 * @throws HttpError if user with same email already exists
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    let { email, fname, lname, password } = req.body
    const allUsers = await usersModelManager.getAll()
    const userIndex = await findItemByProperty(allUsers, "email", email)

    if (userIndex !== -1) {
      throw new HttpError(400, "user with this email already exists")
    } else {
      const newUser = {
        id: Date.now(),
        email,
        fname,
        lname,
        password,
        test: "test",
      }
      await usersModelManager.add(newUser)
      res.status(201).send(newUser)
    }
  } catch (error: any) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message)
    } else {
      res.status(500).send(error.message)
    }
  }
}

export const authenticateUser = async (req: Request, res: Response) => {
  try {
    //code start
    const { email, password } = req.body
    const users = await usersModelManager.getAll()
    const user = users.find((u) => u.email === email && u.password === password)
    if (user) {
      res.json({ userId: user.id })
    } else {
      res.status(401).json({ message: "Invalid email or password" })
    }
  } catch (error: any) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message)
    } else {
      res.status(500).send(error.message)
    }
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    //code start
    let id = parseInt(req.params.id)
    let user = await usersModelManager.getByID(id)
    res.json(user)
  } catch (error: any) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message)
    } else {
      res.status(500).send(error.message)
    }
  }
}

/**
 * search for any provided property and property value in the User Data
 * @param arr - Array to search
 * @param propertyName
 * @param property
 * @returns index of the first elemment with the following property. -1 if property does not exist
 */
const findItemByProperty = (
  arr: Array<User>,
  propertyName: keyof User,
  property: string | number
): number => {
  return arr.findIndex((currItem) => currItem[propertyName] === property)
}
