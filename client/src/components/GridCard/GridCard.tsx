import { NavLink } from "react-router-dom"
import "./GridCard.css"
import "../../styles/template.css"

type Props = {
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

  return (
    <>
      <div className="productCard">
        <NavLink to={route}>
          <img className="productImage" src={img}></img>
        </NavLink>
        <div className="productDetails">
          <NavLink to={route} className="productTitle">
            {props.title}
          </NavLink>
          <p className="productArtist">{props.artist}</p>
        </div>
        <p className="productPrice">{props.price},-</p>
        <button className="cardButton btn btn-primary" id="liveAlertBtn">
          Add to Cart
        </button>
      </div>
    </>
  )
}

export default GridCard
