import { useContext } from "react";
import { addItemToCart, CartContext } from "../../contexts/CartContext";
import { UserContext } from "../../contexts/UserContext";
import { toast, ToastContainer } from "react-toastify";
import { Product } from "../../types/types";

import styles from "../Button/button.module.css";
import "../../global.css";
import "react-toastify/dist/ReactToastify.css";

type AddToCartButtonProps = {
  product: Product;

};

function AddToCart({ product }: AddToCartButtonProps) {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("UserContext undefined");
  const userId = ctx.user.id;

  const { dispatch } = useContext(CartContext);
  const handleAddToCart = () => {
    addItemToCart(dispatch, product, 1, userId);
    toast.success("Product has been added to cart", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  return (
    <div>
      <button onClick={handleAddToCart} className={styles.button}>
        Add to Cart <ToastContainer hideProgressBar />
      </button>
    </div>
  );
}

export default AddToCart;
