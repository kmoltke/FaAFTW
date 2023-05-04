import React, { createContext, useReducer } from 'react'
import { cartReducer } from '../reducers/cartReducer'

export interface Product {
  id: number
  artist: string
  album: string
  price: number
  imageSrc: string
}

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
  type: string
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
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState)

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export const addItemToCart = (
  dispatch: React.Dispatch<Action>,
  product: Product,
  quantity: number,
  userId: number
) => {
  dispatch({
    type: 'ADD_ITEM',
    payload: {
      id: product.id,
      artist: product.artist,
      album: product.album,
      price: product.price,
      image: product.imageSrc,
      quantity: quantity,
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
    type: 'REMOVE_ITEM',
    payload: { id: productId, price: productPrice },
  })
}
