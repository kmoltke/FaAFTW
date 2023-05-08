import styles from "./ProductDescriptionPage.module.css"
import "../../global.css"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import AddToCardButton from "../../components/AddToCardButton/AddToCardButton"
import "react-toastify/dist/ReactToastify.css"
import GoBackButton from "../../components/GoBackButton/GoBackButton"

function ProductDescriptionPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<any>()

  useEffect(() => {
    fetch("http://localhost:5000/products/" + id)
      .then((data) => data.json())
      .then((parsedData) => setProduct(parsedData))
  }, [])

  return (
    <main>
      <GoBackButton />
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
            <AddToCardButton product={product} />
            <main> {product?.description}</main>
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
  )
}

export default ProductDescriptionPage

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
