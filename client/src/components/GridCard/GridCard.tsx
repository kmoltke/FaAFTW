import {NavLink} from "react-router-dom"
import styles from "./GridCard.module.css"
import "../../styles/template.css"
import {addToCart, CartContext} from "../../contexts/CartContext";
import {useContext} from "react";


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



    // const {cart, setCart} = useContext(CartContext)
    //
    // if (!ctx)
    //     throw new Error("Cart is undefined")
    // ctx.updateCart({(prev) => products: [...prev, {id:props.id, title:props.title, artist:props.artist, img:img, quantity:1}]})
    // // const vinyl: Props = {}

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
                //TODO:
                <button onClick={() => {}} className="cardButton btn btn-primary" id="liveAlertBtn">
                    Add to Cart
                </button>
            </div>
        </>
    )
}

export default GridCard
