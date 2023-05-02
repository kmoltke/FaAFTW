import React, {useState} from "react"

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

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>({ id: 0, fname: "", lname: "" });
  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  return <UserContext.Provider value={{user: user, updateUser: updateUser}}>{children}</UserContext.Provider>;
};