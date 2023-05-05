import styles from "./ProductDescriptionPage.module.css";
import "../../global.css";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import {
  addItemToCart,
  CartContext,
  Product,
} from "../../contexts/CartContext";
import { UserContext } from "../../contexts/UserContext";

export type Vinyl = {
  id: number;
  artist: string;
  album: string;
  decade: string;
  year: number;
  genre: string;
  price: number;
  type: string;
  label: string;
  image: string;
  featured?: boolean;
  featuredColor?: string;
  description: string;
};

function ProductDescriptionPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>();

  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("UserContext undefined");
  const userId = ctx.user.id;

  useEffect(() => {
    fetch("http://localhost:5000/products/" + id)
      .then((data) => data.json())
      .then((parsedData) => setProduct(parsedData));
  }, []);

  const { dispatch } = useContext(CartContext);
  const handleAddToCart = () => {
    addItemToCart(dispatch, product, 1, userId);
    fetch(`http://localhost:5000/users/${userId}/basket/products`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
  };

  return (
    <main>
      <section>
        <h1> Product Description </h1>
        <div className={styles.productOuter}>
          <div>
            <img className={styles.productImage} src={product?.image} />
          </div>
          <div className={styles.productOverview}>
            <h1 className={styles.productTitle}> {product?.album}</h1>
            <h3 className={styles.productArtist}> {product?.artist}</h3>
            <p className={styles.productPrice}> {product?.price}</p>
            <button
              onClick={() => {
                handleAddToCart();
              }}
              className={styles.productButton}
            >
              {" "}
              Add to Cart
            </button>
            <p> {product?.description}</p>
          </div>
        </div>
        <div className={styles.productDetails}>
          <p> Year: {product?.year} </p>
          <p> Genre: {product?.genre} </p>
          <p> Type: {product?.type} </p>
          <p> Label: {product?.label} </p>
        </div>
      </section>
    </main>
  );
}

export default ProductDescriptionPage;

{
  /* Button to go back to front page
};
const addToCart = "";
<Button onClick={addToCart} className="cardButton btn btn-primary">

      <div className="container">


<h1 className="productTitle"> {product?.album}</h1>
<h3 className="productArtist"> {product?.artist}</h3>
<p className="productPrice"> {product?.price}</p>


const history = useHistory();
const handleReturnClick = () => {
  history.push("/");
*/
}
