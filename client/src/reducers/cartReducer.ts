import {CartState, initialCartState, Action, CartItem} from '../contexts/CartContext';

export const cartReducer = (state: CartState, action: Action): CartState => {
    const isLoggedIn = action.payload.userId !== 0
    switch (action.type) {
        case 'ADD_ITEM':
            if (isLoggedIn) {
                const response = fetch(`http://localhost:5000/users/${action.payload.userId}/basket/products`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        id: action.payload.id,
                        price: action.payload.price,
                        quantity: action.payload.quantity
                    })
                })
            }
            const existingItemIndex = state.items.findIndex((item: CartItem) => item.id === action.payload.id);

            if (existingItemIndex !== -1) {
                // If the product already exists in the cart, update the quantity
                const updatedItems = [...state.items]
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity
                }
                return {items: updatedItems, total: state.total + action.payload.price}
            } else {
                // If the product is not already in the cart, add it
                const updatedItems = [...state.items]
                updatedItems.push(
                    {
                        id: action.payload.id,
                        artist: action.payload.artist,
                        album: action.payload.album,
                        price: action.payload.price,
                        image: action.payload.image,
                        quantity: 1
                    }
                )
                return {...state, items: updatedItems, total: state.total + action.payload.price};
            }
        case 'REMOVE_ITEM':
            if (isLoggedIn) {
                const response = fetch(`http://localhost:5000/users/${action.payload.userId}/basket/products/${action.payload.id}`, {
                    method: `DELETE`,
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        id: action.payload.id,
                        price: action.payload.price,
                        quantity: action.payload.quantity
                    })
                })
            }
            const index = state.items.findIndex(prod => prod.id === action.payload.id)
            // product is not in cart
            if (index === -1) {
                console.log("RemoveItem error: Shouldn't happen. Item is not in cart!")
                return state
            }
            // product is in context and quantity more than 1:
            else if (state.items[index].quantity > 1) {
                const updatedItems = [...state.items]
                updatedItems[index] = {
                    ...updatedItems[index],
                    quantity: updatedItems[index].quantity - action.payload.quantity
                }
                return {items: updatedItems, total: state.total - action.payload.price}
            } else {
                const filteredItems = state.items.filter((item) => item.id !== action.payload.id)
                return {...state, items: filteredItems, total: state.total - action.payload.price}
            }
        default:
            return state;
    }
};