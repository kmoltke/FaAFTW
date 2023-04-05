import { Request, Response } from "express"
import { managerType, ModelManager } from "../model/model-manager"

export async function createUser(req: Request, res: Response) {
  try {
    const modelManager = new ModelManager(managerType.users)
    let { email, fname, lname, password } = req.body
    const allUsers = await modelManager.getItemArray(managerType.users)
    const userIndex = await modelManager.findItemByProperty(
      allUsers,
      "email",
      email
    )

    if (userIndex !== -1) {
      throw new Error("user with this email already exists")
    } else {
      const newUser = {
        id: Date.now(),
        email,
        fname,
        lname,
        password,
      }
      await modelManager.add(newUser)
      res.end("User created successfully")
    }
  } catch (error: any) {
    res.status(400).send(error.message)
  }
}
