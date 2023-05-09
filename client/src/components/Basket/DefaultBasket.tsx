import { Card, Col, Row } from "react-bootstrap"
import { useContext } from "react"
import BasketSummary from "../BasketSummary/BasketSummary"
import BasketItem from "../BasketItem/BasketItem"
import { CartContext, CartItem } from "../../contexts/CartContext"

function DefaultBasket() {
  const { cartState: cart } = useContext(CartContext)

  return (
    <Card style={{ paddingTop: 25, paddingBottom: 25 }}>
      <Row>
        <Col sm={8}>
          <div className="m-5">
            {cart.items.length === 0 ? (
              <h3>Your cart is empty, go shopping!</h3>
            ) : (
              cart.items.map((prod: CartItem) => (
                <BasketItem
                  key={prod.id}
                  id={prod.id}
                  artist={prod.artist}
                  album={prod.album}
                  quantity={prod.quantity}
                  price={prod.price}
                  image={prod.image}
                ></BasketItem>
              ))
            )}
          </div>
        </Col>
        <Col sm={4}>
          <BasketSummary total={cart.total}></BasketSummary>
        </Col>
      </Row>
    </Card>
  )
}

export default DefaultBasket
