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
  if (!ctx) throw new Error("UserContext undefined")
  const userId = ctx.user.id

  const { dispatch } = useContext(CartContext)
  const handleAddToCart = () => {
    addItemToCart(dispatch, product, userId)

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
