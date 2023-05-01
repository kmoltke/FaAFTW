import React, { useContext, useState } from "react"

type User = {
  id: number
  fname: string
  lname: string
}

export interface IUserContext {
  user: User | undefined
  updateUser: (user: User | undefined) => void
}

const defaultUserContext: IUserContext = {
  user: undefined,
  updateUser: () => {},
}

export const UserContext = React.createContext(defaultUserContext)

export function useUserContext() {
  const context = useContext(UserContext)
  return context
}

export function UserContextProvider({ children }: any) {
  const [user, setUser] = useState<User>()

  const updateUser = (user: User | undefined) => {
    setUser(user)
  }

  const userContext: IUserContext = {
    user,
    updateUser,
  }

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  )
}
