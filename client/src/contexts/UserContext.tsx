import React, { useContext, useState } from "react"
import { CartContext, CartState, setCart } from "./CartContext"
import { User } from "../types/types"

interface IUserContext {
  user: User | null
  updateUser: (user: User | null) => void
}

export const UserContext = React.createContext<IUserContext>({
  user: null,
  updateUser: () => {},
})

export const UserProvider = ({ children }: any) => {
  const { cartState, dispatch } = useContext(CartContext)
  const [user, setUser] = useState<User | null>(null)
  const updateUser = async (newUser: User | null) => {
    setUser(newUser)
    if (!newUser) {
      // clear cart ctx
      dispatch({ type: "RESET_CART" })
    } else {
      // post all items in ctx cart to the api
      const updatedCart = await combineLocalAndServerCart(newUser.id, cartState)

      if (updatedCart) {
        setCart(dispatch, updatedCart.products, newUser.id)
      }
    }
  }
  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

async function combineLocalAndServerCart(userId: number, cart: CartState) {
  const result = await fetch(
    `http://localhost:5000/users/${userId}/basket/products`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart.items),
    }
  )

  return await result.json()
}
