import { useContext } from "react"
import {
  CartContext,
  CartItem,
  removeItemFromCart,
} from "../../contexts/CartContext"
import { UserContext } from "../../contexts/UserContext"

function BasketItem(props: CartItem) {
  const { dispatch } = useContext(CartContext)
  const userContext = useContext(UserContext)

  if (!userContext) {
    throw new Error("UserContext undefined")
  }
  const { user } = userContext

  const handleRemoveItem = (id: number, price: number) => {
    removeItemFromCart(dispatch, id, price)
    if (user) {
      fetch(`http://localhost:5000/users/${user.id}/basket/products/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
    }
  }

  return (
    <div className="row m-4 d-flex justify-content-between align-items-center">
      <div className="col-md-2 col-lg-2 col-xl-2">
        <img
          src={`${props.image}`}
          className="img-fluid rounded-3"
          alt={`${props.image}`}
        ></img>
      </div>
      <div className="col-md-4 col-lg-4 col-xl-4">
        <h3 className="text-muted">{props.album}</h3>
        <p className="text-black mb-0">{props.artist}</p>
        <p className="text-black mb-0">Price: {props.price},-</p>
      </div>
      <div className="col-md-4 col-lg-3 col-xl-3 offset-lg-2">
        <p className="mb-0" style={{ whiteSpace: "pre-line" }}>
          Qty: {props.quantity}
          <br />
          Total: {`${props.price * props.quantity},- `}{" "}
        </p>
      </div>
      <div className="col-md-1 col-lg-1 col-xl-1 text-end">
        <button
          onClick={() => handleRemoveItem(props.id, props.price)}
          className="btn btn-secondary btn-sm"
        >
          X
        </button>
      </div>
    </div>
  )
}

export default BasketItem
