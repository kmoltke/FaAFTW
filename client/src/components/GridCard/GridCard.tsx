import { NavLink } from "react-router-dom"
import styles from "./GridCard.module.css"
import "../../styles/template.css"

import { useContext, useState } from "react"
import { addItemToCart, CartContext, Product } from "../../contexts/CartContext"
import { UserContext } from "../../contexts/UserContext"

interface Props {
  id: number
  album: string
  artist: string
  price: number
  imageSrc?: string
}

function GridCard(props: Props) {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error("UserContext undefined")
  const userId = ctx.user.id

  const noImg = "/images/no-image.jpg"
  const img = props.imageSrc ?? noImg
  const route = "/products/" + props.id

  const item: Product = {
    id: props.id,
    album: props.album,
    artist: props.artist,
    price: props.price,
    imageSrc: img,
  }

  // If we want to be able to bulk add:
  // const [quantity, setQuantity] = useState(1)
  const { dispatch } = useContext(CartContext)
  const handleAddToCart = () => {
    addItemToCart(dispatch, item, 1, userId)
  }

  return (
    <>
      <div className={styles.productCard}>
        <NavLink to={route}>
          <img className={styles.productImage} src={img}></img>
        </NavLink>
        <div className={styles.productDetails}>
          <a className={styles.productAlbum}>{props.album}</a>
          <p className={styles.productArtist}>{props.artist}</p>
        </div>
        <p className={styles.productPrice}>{props.price},-</p>
        <button
          onClick={() => {
            handleAddToCart()
          }}
          className={styles.cardButton}
          id="liveAlertBtn"
        >
          Add to Cart
        </button>
      </div>
    </>
  )
}

export default GridCard
