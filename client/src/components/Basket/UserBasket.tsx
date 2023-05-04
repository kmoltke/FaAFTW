import { Card, Col, Row } from 'react-bootstrap'
import { useContext, useEffect, useState } from 'react'
import BasketSummary from '../BasketSummary/BasketSummary'
import BasketItem from '../BasketItem/BasketItem'
import { CartContext, CartItem, CartState } from '../../contexts/CartContext'
import { UserContext } from '../../contexts/UserContext'

interface Vinyl {
  id: number
  album: string
  artist: string
  price: number
  imageSrc: string
}

interface BasketItem {
  id: number
  price: number
  quantity: number
}

interface Basket {
  id: number
  basketId: number
  products: BasketItem[]
}

function UserBasket() {
  const [cartData, setCartData] = useState<Basket | null>(null)
  const [vinyls, setVinyls] = useState<Vinyl[]>([])
  const { cartState } = useContext(CartContext)
  const userContext = useContext(UserContext)

  if (!userContext) {
    throw new Error('UserContext undefined')
  }

  console.log('user basket rendered')

  const user = userContext.user

  useEffect(() => {
    try {
      fetch(`http://localhost:5000/products`)
        .then((response) => response.json())
        .then((data) => setVinyls(data))

      fetch(`http://localhost:5000/users/${user.id}/basket`)
        .then((response) => response.json())
        .then((data) => setCartData(data))
    } catch (error) {
      console.error(error)
    }
  }, [user.id])

  //   useEffect(() => {
  //     if (cartData && vinyls.length > 0) {
  //       const newCart: CartItem[] = cartData.products.map((item) => {
  //         const v = vinyls.find((i) => i.id === item.id)
  //         if (!v) throw new Error('Cannot find a vinyl with that id')

  //         return {
  //           id: item.id,
  //           artist: v.artist,
  //           album: v.album,
  //           price: v.price,
  //           image: v.imageSrc,
  //           quantity: item.quantity,
  //         }
  //       })
  //       setCart(newCart)
  //     }
  //   }, [cartData, vinyls])

  return (
    <Card>
      <Row>
        <Col sm={8}>
          <h3>Products</h3>
          <hr />
          {cartState?.items?.map((prod: CartItem) => {
            return (
              <BasketItem
                id={prod.id}
                artist={prod.artist}
                album={prod.album}
                quantity={prod.quantity}
                price={prod.price}
                image={prod.image}
              ></BasketItem>
            )
          })}
        </Col>
        <Col sm={4}>
          <h3>Summary</h3>
          <hr />
          <BasketSummary total={cartState?.total}></BasketSummary>
        </Col>
      </Row>
    </Card>
  )
}

export default UserBasket
