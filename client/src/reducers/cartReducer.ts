import {CartState, initialCartState, Action, CartItem} from '../contexts/CartContext';

export const cartReducer = (state: CartState = initialCartState, action: Action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const existingItemIndex = state.items.findIndex((item: CartItem) => item.id === action.payload.id);

            if (existingItemIndex !== -1) {
                // If the product already exists in the cart, update the quantity
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex].quantity += action.payload.quantity;
                return { ...state, items: updatedItems };
            } else {
                // If the product is not already in the cart, add it
                return { ...state, items: [...state.items, action.payload] };
            }
        case 'REMOVE_ITEM':
            const filteredItems = state.items.filter((item) => item.id !== action.payload.id);
            return { ...state, items: filteredItems };
        default:
            return state;
    }
};
