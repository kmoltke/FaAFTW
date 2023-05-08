import ReactCarousel from "react-bootstrap/Carousel"
import { useEffect, useState } from "react"
import styles from "./Carousel.module.css"
import "../../global.css"
import { Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Product } from "../../types/types"
import "bootstrap/dist/css/bootstrap.min.css"

function Carousel() {
  const [products, setProducts] = useState<Product[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    fetch("http://localhost:5000/products?featured=true")
      .then((data) => data.json())
      .then((parsedData) => setProducts(parsedData))
  }, [])

  const activeProduct = products[activeIndex]

  return (
    <>
      <section
        style={{
          backgroundColor: activeProduct?.featuredColor,
          maxWidth: "100%",
        }}
      >
        <h3 className={styles.carouselh3}> Featured new releases </h3>
        <ReactCarousel
          style={{
            maxWidth: "1200px",
            margin: "auto",
          }}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        >
          {products?.map((product) => (
            <ReactCarousel.Item
              key={product.id}
              className={styles.carouselItem}
            >
              <ReactCarousel.Caption className={styles.carouselh1}>
                <h1>
                  {" "}
                  {product?.album} - {product?.artist} →
                </h1>
              </ReactCarousel.Caption>
              <Link to={"/products/" + product.id}>
                <img className={styles.carouselImg} src={product?.image} />
              </Link>
            </ReactCarousel.Item>
          ))}
        </ReactCarousel>
      </section>
    </>
  )
}

export default Carousel
