import { Card, Col, Row } from 'react-bootstrap'
import { useContext, useEffect, useState } from 'react'
import BasketSummary from '../BasketSummary/BasketSummary'
import BasketItem from '../BasketItem/BasketItem'
import { CartContext, CartItem, setCart } from '../../contexts/CartContext'
import { UserContext } from '../../contexts/UserContext'
interface Vinyl {
  id: number
  album: string
  artist: string
  price: number
  image: string
}

interface BasketItem {
  id: number
  price: number
  quantity: number
}

function UserBasket() {
  const { cartState: cart, dispatch } = useContext(CartContext)
  const userContext = useContext(UserContext)

  if (!userContext) {
    throw new Error('UserContext undefined')
  }

  const user = userContext.user

  useEffect(() => {
    fetch(`http://localhost:5000/users/${user.id}/basket`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .catch((error) =>
        console.log('error trying to create empty basket: ', error)
      )

    fetch(`http://localhost:5000/users/${user.id}/basket`)
      .then((response) => response.json())
      .then((datita) => {
        console.log('datita: ', datita)
        return datita
      })
      .then((data) => setCart(dispatch, data.products, data.total))
      .catch((error) => console.log(error))
  }, [])

  return (
    <Card>
      <Row>
        <Col sm={8}>
          <div className="m-5">
            <h1>Products</h1>
            <hr />
            {cart?.items?.length === 0 ? (
              <h3>Your cart is empty, go shopping!</h3>
            ) : (
              cart?.items.map((prod: CartItem) => (
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
          <h3>Summary</h3>
          <hr />
          <BasketSummary total={cart.total}></BasketSummary>
        </Col>
      </Row>
    </Card>
  )
}

export default UserBasket
