import React from "react";

export interface cartItem {
    id: number
    title: string
    artist: string
    img: string
    quantity: number
}

export interface Cart {
    products: cartItem[]
    total: number
}

export interface ICartContext {
    cart: Cart
    updateCart: (cartItem: cartItem) => void
}

export const CartContext = React.createContext<ICartContext | undefined>(
    undefined
)


export const addToCart = (item: cartItem) => {

}