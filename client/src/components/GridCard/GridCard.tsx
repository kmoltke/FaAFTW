import { NavLink } from "react-router-dom"
import styles from "./GridCard.module.css"
import "../../global.css"
import { Product } from "../../types/types"
import AddToCardButton from "../AddToCardButton/AddToCardButton"
import "react-toastify/dist/ReactToastify.css"

interface GridCardProps {
  id: number
  album: string
  artist: string
  price: number
  image?: string
}

function GridCard(props: GridCardProps) {
  const noImg = "/images/no-image.jpg"
  const img = props.image ?? noImg
  const route = "/products/" + props.id

  const item: Product = {
    id: props.id,
    album: props.album,
    artist: props.artist,
    price: props.price,
    image: img,
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
        <AddToCardButton product={item} />
      </div>
    </>
  )
}

export default GridCard
