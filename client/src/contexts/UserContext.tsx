import React, { useContext, useState } from "react"


export interface CartItem {
  id: number
  title: string
  artist: string
  img: string
  quantity: number
}

export interface User {
  id: number
  fname: string
  lname: string
  products: CartItem[]
}

export interface IUserContext {
  user: User
  updateUser: (user: User) => void
}

const defaultUserContext: IUserContext = {
  user: {id: 0, fname: "", lname: "", products: []},
  updateUser: () => {},
}

export const UserContext = React.createContext<IUserContext | undefined>(
    undefined
)


//
// export function useUserContext() {
//   const context = useContext(UserContext)
//   return context
// }
//
// export function UserContextProvider({ children }: any) {
//   const [user, setUser] = useState<User>()
//
//   const updateUser = (user: User) => {
//     setUser(user)
//   }
//
//   const userContext: IUserContext = {
//     user,
//     updateUser,
//   }
//
//   return (
//     <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
//   )
// }
