import { useContext } from 'react'
import {
  CartContext,
  CartItem,
  removeItemFromCart,
} from '../../contexts/CartContext'

function BasketItem(props: CartItem) {
  const { dispatch } = useContext(CartContext)

  const handleRemoveItem = (id: number, price: number) => {
    removeItemFromCart(dispatch, id, price)
  }

  return (
    <div className="row m-4 d-flex justify-content-between align-items-center">
      <div className="col-md-2 col-lg-2 col-xl-2">
        <img
          src={props.image}
          className="img-fluid rounded-3"
          alt="../../images/id3-1.jpg"
        ></img>
      </div>
      <div className="col-md-3 col-lg-3 col-xl-3">
        <h6 className="text-muted">{props.artist}</h6>
        <h6 className="text-black mb-0">{props.album}</h6>
      </div>
      <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
        <h6 className="mb-0"> {`DKK${props.price} `} </h6>
      </div>
      <div className="col-md-1 col-lg-1 col-xl-1 text-end">
        <button
          onClick={() => handleRemoveItem(props.id, props.price)}
          className="text-muted"
        >
          X
        </button>
      </div>
    </div>
  )
}

export default BasketItem
