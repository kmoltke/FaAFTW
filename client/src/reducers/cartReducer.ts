import {
  CartState,
  initialCartState,
  Action,
  CartItem,
} from '../contexts/CartContext'

export const cartReducer = (
  state: CartState = initialCartState,
  action: Action
) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(
        (item: CartItem) => item.id === action.payload.id
      )

      if (existingItemIndex !== -1) {
        // If the product already exists in the cart, update the quantity
        const updatedItems = [...state.items]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        }

        return {
          items: updatedItems,
          total: state.total + action.payload.price,
        }
      } else {
        // If the product is not already in the cart, add it
        return {
          items: [...state.items, action.payload],
          total: state.total + action.payload.price,
        }
      }
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(
        (item) => item.id !== action.payload.id
      )

      const removedItemIndex = state.items.findIndex(
        (item: CartItem) => item.id === action.payload.id
      )

      const itemToRemove = state.items[removedItemIndex]

      return {
        items: filteredItems,
        total: state.total - itemToRemove.quantity * itemToRemove.price, //Aca va el bug fix
      }

    case 'SET_CART':
      return {
        items: [...action.payload.items],
        total: action.payload.total,
      }
    default:
      return state
  }
}
