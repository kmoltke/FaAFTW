import React, { createContext, useEffect, useReducer } from "react"
import { cartReducer } from "../reducers/cartReducer"
import { Product } from "../types/types"

export const CART_KEY = "cart"

export interface CartItem {
  id: number
  artist: string
  album: string
  image: string
  price: number
  quantity: number
}

export interface CartState {
  items: CartItem[]
  total: number
}

export interface Action {
  type: "ADD_ITEM" | "REMOVE_ITEM" | "SET_CART" | "RESET_CART"
  payload?: any
}

export const initialCartState: CartState = {
  items: [],
  total: 0,
}

export const CartContext = createContext<{
  cartState: CartState
  dispatch: React.Dispatch<Action>
}>({
  cartState: initialCartState,
  dispatch: () => {},
})

export const CartProvider = ({ children }: any) => {
  const [cartState, dispatch] = useReducer(cartReducer, getInitialState())

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartState))
  }, [cartState])

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

function getInitialState() {
  const cart = localStorage.getItem(CART_KEY)
  return cart ? JSON.parse(cart) : initialCartState
}

export const setCart = (
  dispatch: React.Dispatch<Action>,
  items: CartItem[],
  total: number
) => {
  dispatch({
    type: "SET_CART",
    payload: {
      items,
      total,
    },
  })
}

export const addItemToCart = (
  dispatch: React.Dispatch<Action>,
  product: Product,
  userId?: number
) => {
  dispatch({
    type: "ADD_ITEM",
    payload: {
      id: product.id,
      artist: product.artist,
      album: product.album,
      price: product.price,
      image: product.image,
      quantity: 1,
      userId: userId,
    },
  })
}

export const removeItemFromCart = (
  dispatch: React.Dispatch<Action>,
  productId: number,
  productPrice: number
) => {
  dispatch({
    type: "REMOVE_ITEM",
    payload: { id: productId, price: productPrice },
  })
}
