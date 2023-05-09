import { NavLink } from "react-router-dom"
import styles from "./GridCard.module.css"
import "../../global.css"
import { Product } from "../../types/types"
import AddToCardButton from "../AddToCardButton/AddToCardButton"

interface GridCardProps {
  product: Product
}

function GridCard(props: GridCardProps) {
  const noImg = "/images/no-image.jpg"
  const img = props.product.image ?? noImg
  const route = "/products/" + props.product.id

  return (
    <div className={styles.productCard}>
      <NavLink to={route}>
        <img className={styles.productImage} src={img}></img>
      </NavLink>
      <div className={styles.productDetails}>
        <NavLink to={route}>
          <p className={styles.productAlbum}>{props.product.album}</p>
        </NavLink>
        <p className={styles.productArtist}>{props.product.artist}</p>
      </div>
      <p className={styles.productPrice}>{props.product.price},-</p>
      <AddToCardButton product={props.product} />
    </div>
  )
}

export default GridCard
