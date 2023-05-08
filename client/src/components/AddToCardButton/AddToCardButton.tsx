import { useContext } from "react"
import { addItemToCart, CartContext } from "../../contexts/CartContext"
import { UserContext } from "../../contexts/UserContext"
import { toast, ToastContainer } from "react-toastify"
import { Product } from "../../types/types"

import styles from "../AddToCardButton/AddToCardButton.module.css"
import "../../global.css"
import "react-toastify/dist/ReactToastify.css"

type AddToCartButtonProps = {
  product: Product
}

function AddToCardButton({ product }: AddToCartButtonProps) {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error("UserContext undefined")
  const userId = ctx.user.id

  const { dispatch } = useContext(CartContext)
  const handleAddToCart = () => {
    addItemToCart(dispatch, product, 1, userId)
    fetch(`http://localhost:5000/users/${userId}/basket/products`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })

    toast.success("Product has been added to cart", {
      position: toast.POSITION.BOTTOM_RIGHT,
    })
  }

  return (
    <div>
      <button onClick={handleAddToCart} className={styles.button}>
        Add to Cart <ToastContainer className={styles.toast} hideProgressBar />
      </button>
    </div>
  )
}

export default AddToCardButton
