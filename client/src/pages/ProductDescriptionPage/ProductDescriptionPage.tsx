import styles from "./ProductDescriptionPage.module.css";
import "../../global.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AddToCart from "../../components/Button/Button";
import "react-toastify/dist/ReactToastify.css";

function ProductDescriptionPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>();

  useEffect(() => {
    fetch("http://localhost:5000/products/" + id)
      .then((data) => data.json())
      .then((parsedData) => setProduct(parsedData));
  }, []);

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
            <AddToCart product={product} />
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
  /* 
const history = useHistory();
const handleReturnClick = () => {
  history.push("/");
*/
}
