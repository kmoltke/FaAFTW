import React from "react"
import { User } from "../../../api/src/users/users.model"

export interface IUserContext {
  userId: number
  updateUser: (id: number) => void
}

export const UserContext = React.createContext<IUserContext | undefined>(
  undefined
)
