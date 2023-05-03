import { NavLink } from "react-router-dom"
import styles from "./GridCard.module.css"
import "../../styles/template.css"
import { useContext, useState } from "react"
import { addItemToCart, CartContext, Product } from "../../contexts/CartContext"

interface Props {
  id: number
  title: string
  artist: string
  price: number
  imageSrc?: string
}

function GridCard(props: Props) {
  const noImg = "/images/no-image.jpg"
  const img = props.imageSrc ?? noImg
  const route = "/products/" + props.id

  const item: Product = {
    id: props.id,
    album: props.title,
    artist: props.artist,
    price: props.price,
    imageSrc: img,
  }

  const [quantity, setQuantity] = useState(1)
  const { dispatch } = useContext(CartContext)
  const handleAddToCart = () => {
    addItemToCart(dispatch, item, quantity)
  }

  return (
    <>
      <div className={styles.productCard}>
        <NavLink to={route}>
          <img className={styles.productImage} src={img}></img>
        </NavLink>
        <div className={styles.productDetails}>
          <a className={styles.productTitle}>{props.title}</a>
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
