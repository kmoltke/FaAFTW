import styles from "./ProductDescriptionPage.module.css"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import AddToCardButton from "../../components/AddToCardButton/AddToCardButton"
import GoBackButton from "../../components/GoBackButton/GoBackButton"
import { Product } from "../../types/types"

function ProductDescriptionPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product>()

  useEffect(() => {
    fetch("http://localhost:5000/products/" + id)
      .then((data) => data.json())
      .then((parsedData) => setProduct(parsedData))
  }, [])

  if (!product) {
    return (
      <main>
        <GoBackButton />
        <section>
          <h1> Product not found </h1>
        </section>
      </main>
    )
  }

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
            <h2 className={styles.productTitle}> {product?.album}</h2>
            <p className={styles.productArtist}> {product?.artist}</p>
            <h1 className={styles.productPrice}> {product?.price},-</h1>
            <AddToCardButton product={product} />
            <p className={styles.productDescription}> {product?.description}</p>
          </div>
        </div>
        <h2> More details </h2>
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
