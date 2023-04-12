import { Request, Response } from 'express'
import { ModelManager } from '../model/model-manager'
import { User } from './users.model'

const USERS_FILE = './data/users.json'
const usersModelManager = new ModelManager<User>(USERS_FILE)

export async function createUser(req: Request, res: Response) {
  try {
    let { email, fname, lname, password } = req.body
    const allUsers = await usersModelManager.getAll()
    const userIndex = await usersModelManager.findItemByProperty(
      allUsers,
      'email',
      email
    )

    if (userIndex !== -1) {
      throw new Error('user with this email already exists')
    } else {
      const newUser = {
        id: Date.now(),
        email,
        fname,
        lname,
        password,
      }
      await usersModelManager.add(newUser)
      res.end('User created successfully')
    }
  } catch (error: any) {
    res.status(400).send(error.message)
  }
}
