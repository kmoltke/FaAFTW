import { Card, Col, Row } from "react-bootstrap"
import { useContext, useEffect } from "react"
import BasketSummary from "../BasketSummary/BasketSummary"
import BasketItem from "../BasketItem/BasketItem"
import { CartContext, CartItem, setCart } from "../../contexts/CartContext"
import { UserContext } from "../../contexts/UserContext"

function Basket() {
  const { cartState: cart, dispatch } = useContext(CartContext)
  const { user } = useContext(UserContext)

  const formatNumber = (x: number) =>
    new Intl.NumberFormat("da-DK", { maximumFractionDigits: 0 }).format(x)

  useEffect(() => {
    if (!user) {
      return
    }

    fetch(`http://localhost:5000/users/${user?.id}/basket`)
      .then((response) => response.json())
      .then((data) => setCart(dispatch, data.products, data.total))
      .catch((error) => console.log(error))
  }, [user])

  return (
    <Card className="p-4">
      <Row>
        <Col sm={8}>
          {cart?.items?.length === 0 ? (
            <h3>Your cart is empty, go shopping!</h3>
          ) : (
            cart?.items.map((prod: CartItem) => (
              <BasketItem key={prod.id} {...prod} />
            ))
          )}
        </Col>
        <Col sm={4} className="mt-4">
          <BasketSummary total={formatNumber(cart.total)} />
        </Col>
      </Row>
    </Card>
  )
}

export default Basket
