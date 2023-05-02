import React, {useContext, useReducer, useState} from "react"
import {cartReducer} from "../reducers/cartReducer";
import {CartContext, initialCartState} from "./CartContext";

export interface User {
    id: number
    fname: string
    lname: string
}

export interface IUserContext {
    user: User
    updateUser: (user: User) => void
}

const defaultUserContext: IUserContext = {
    user: {id: 0, fname: "", lname: ""},
    updateUser: () => {
    },
}

export const UserContext = React.createContext<IUserContext | undefined>(
    {
        user: {id: 0, fname: "", lname: ""}, updateUser: () => {
        }
    }
)

// export const UserProvider = ({children}: any) => {
//     const [userState, setUser] = useState<User>(
//         {id: 0, fname: "", lname: ""}
//     )
//     const updateUser = (user: User) => {
//         setUser(user)
//     }
//
//     return (<UserContext.Provider value={{userState, setUser}}>{children}</UserContext.Provider>)
// };

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>({ id: 0, fname: "", lname: "" });
  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  return <UserContext.Provider value={{user: user, updateUser: updateUser}}>{children}</UserContext.Provider>;
};

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
