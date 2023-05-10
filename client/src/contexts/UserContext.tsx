import React, { useContext, useState } from "react"
import { CART_KEY, CartContext, CartState } from "./CartContext"

interface User {
  id: number
  fname: string
  lname: string
}
interface IUserContext {
  user: User | null
  updateUser: (user: User | null) => void
}

export const UserContext = React.createContext<IUserContext>({
  user: null,
  updateUser: () => {},
})

const USER_KEY = "user"

export const UserProvider = ({ children }: any) => {
  const { cartState, dispatch } = useContext(CartContext)
  const [user, setUser] = useState<User | null>(getInitialState)
  const updateUser = (newUser: User | null) => {
    setUser(newUser)
    if (!newUser) {
      // clear cart ctx
      dispatch({ type: "RESET_CART" })
      localStorage.removeItem(USER_KEY)
    } else {
      // post all items in ctx cart to the api
      combineLocalAndServerCart(newUser.id, cartState)
      localStorage.setItem(USER_KEY, JSON.stringify(newUser))
    }
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

async function combineLocalAndServerCart(userId: number, cart: CartState) {
  fetch(`http://localhost:5000/users/${userId}/basket/products`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cart.items),
  })
}

function getInitialState() {
  const user = localStorage.getItem(USER_KEY)
  return user ? JSON.parse(user) : null
}
