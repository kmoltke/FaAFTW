import { Card, Col, Row } from 'react-bootstrap'
import { useContext } from 'react'
import BasketSummary from '../BasketSummary/BasketSummary'
import BasketItem from '../BasketItem/BasketItem'
import { CartContext, CartItem } from '../../contexts/CartContext'

function DefaultBasket() {
  const { cartState } = useContext(CartContext)

  console.log('cart state: ', cartState)

  console.log('default basket renderd')

  return (
    <Card>
      <Row>
        <Col sm={8}>
          <h3>Products</h3>
          <hr />
          {cartState.items.map((prod: CartItem) => (
            <BasketItem
              key={prod.id}
              id={prod.id}
              artist={prod.artist}
              album={prod.album}
              quantity={prod.quantity}
              price={prod.price}
              image={prod.image}
            ></BasketItem>
          ))}
        </Col>
        <Col sm={4}>
          <h3>Summary</h3>
          <hr />
          <BasketSummary total={cartState.total}></BasketSummary>
        </Col>
      </Row>
    </Card>
  )
}

export default DefaultBasket
