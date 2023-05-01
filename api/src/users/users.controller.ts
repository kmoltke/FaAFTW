import { Request, Response } from 'express'
import { ModelManager } from '../model/model-manager'
import { User } from './users.model'
import { HttpError } from '../utils/http-errors'

const USERS_FILE = './data/users.json'
const usersModelManager = new ModelManager<User>(USERS_FILE)

/**
 * gets all users
 */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await usersModelManager.getAll()
    console.log('all users:', allUsers)
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
    console.log(email, fname, lname, password)
    const allUsers = await usersModelManager.getAll()
    const userIndex = await findItemByProperty(allUsers, 'email', email)

    if (userIndex !== -1) {
      throw new HttpError(400, 'user with this email already exists')
    } else {
      const newUser: User = {
        id: Date.now(),
        email,
        fname,
        lname,
        password,
      }
      await usersModelManager.add(newUser)
      // res.status(201).send(newUser)
      res.json(newUser).status(201).send(newUser)
    }
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
