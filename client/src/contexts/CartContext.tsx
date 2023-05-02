import React, {createContext, useReducer} from 'react';
import {cartReducer} from '../reducers/cartReducer';

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
    items: CartItem[];
}

export interface Action {
    type: string;
    payload?: any;
}

export const initialCartState: CartState = {
    items: [],
};

export const CartContext = createContext<{ cartState: CartState; dispatch: React.Dispatch<Action> }>({
    cartState: initialCartState,
    dispatch: () => {
    },
});

export const CartProvider = ({children}: any) => {
    const [cartState, dispatch] = useReducer(cartReducer, initialCartState)

    return (<CartContext.Provider value={{cartState, dispatch}}>{children}</CartContext.Provider>)
};

export const addItemToCart = (dispatch: React.Dispatch<Action>, product: Product, quantity: number) => {
    dispatch({
        type: 'ADD_ITEM',
        payload: {id: product.id, artist: product.artist, album: product.album, price: product.price, image: product.imageSrc},
    })
}

export const removeItemFromCart = (dispatch: React.Dispatch<Action>, productId: number) => {
    dispatch({
        type: 'REMOVE_ITEM',
        payload: {id: productId},
    })
}


// import React from "react";
//
// export interface cartItem {
//     id: number
//     title: string
//     artist: string
//     img: string
//     quantity: number
// }
//
// export interface Cart {
//     products: cartItem[]
// }
//
// export interface ICartContext {
//     cart: cartItem[]
//     updateCart: (cartItem: cartItem) => void
// }
//
// export const CartContext = React.createContext<ICartContext | undefined>(
//     undefined
// )
//
//
// export const addToCart = (item: cartItem) => {
//
// }