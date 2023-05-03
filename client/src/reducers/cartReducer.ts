import {CartState, initialCartState, Action, CartItem} from '../contexts/CartContext';

const fetchPrice = async (vId: number) => {
    const vinyl = await fetch(`http://localhost:5000/products/${vId}`)
        .then(res => res.json())
        .catch(e => new Error(e))
    return vinyl.price
}

export const cartReducer = (state: CartState = initialCartState, action: Action) => {
    const isLoggedIn = action.payload.userId !== 0
    switch (action.type) {
        case 'ADD_ITEM':
            if (isLoggedIn) {
                console.log(`id: ${action.payload.id}`)
                console.log(`price: ${action.payload.price}`)
                console.log(`quantity: ${action.payload.quantity}`)
                const response = fetch(`http://localhost:5000/users/${action.payload.userId}/basket/products`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({id: action.payload.id, price: action.payload.price, quantity: action.payload.quantity})
                    // body: JSON.stringify({id: action.payload.id, price: fetchPrice(id)})
                })
            }
            const existingItemIndex = state.items.findIndex((item: CartItem) => item.id === action.payload.id);

            if (existingItemIndex !== -1) {
                // If the product already exists in the cart, update the quantity
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex].quantity += action.payload.quantity;
                return {...state, items: updatedItems};
            } else {
                // If the product is not already in the cart, add it
                return {...state, items: [...state.items, action.payload]};
            }
        case 'REMOVE_ITEM':
            const filteredItems = state.items.filter((item) => item.id !== action.payload.id);
            return {...state, items: filteredItems};
        default:
            return state;
    }
};
