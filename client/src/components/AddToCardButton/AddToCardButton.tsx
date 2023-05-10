import styles from "../AddToCardButton/AddToCardButton.module.css"

import { useContext } from "react"
import { addItemToCart, CartContext } from "../../contexts/CartContext"
import { UserContext } from "../../contexts/UserContext"
import { toast } from "react-toastify"
import { Product } from "../../types/types"

type AddToCartButtonProps = {
  product: Product
}

function AddToCardButton({ product }: AddToCartButtonProps) {
  const ctx = useContext(UserContext)
  const userId = ctx.user?.id

  const { dispatch } = useContext(CartContext)
  const handleAddToCart = () => {
    addItemToCart(dispatch, product, userId)

    fetch(`http://localhost:5000/users/${userId}/basket/products`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([{ ...product, quantity: 1 }]),
    })

    toast.success("Product has been added to cart", {
      position: toast.POSITION.BOTTOM_RIGHT,
    })
  }

  return (
    <div>
      <button onClick={handleAddToCart} className={styles.button}>
        Add to Cart
      </button>
    </div>
  )
}

export default AddToCardButton
