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
          padding: "25px 0px 25px 0px",
          maxWidth: "100%",
        }}
      >
        <Container>
          <Row>
            <Col>
              <p className={styles.carouselh3}> Featured new releases </p>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row></Row>
          <ReactCarousel activeIndex={activeIndex} onSelect={setActiveIndex}>
            {products?.map((product) => (
              <ReactCarousel.Item key={product.id}>
                <ReactCarousel.Caption className={styles.carouselh2}>
                  <p>
                    {" "}
                    {product?.album} - {product?.artist} →
                  </p>
                </ReactCarousel.Caption>
                <Link to={"/products/" + product.id}>
                  <img className={styles.carouselImg} src={product?.image} />
                </Link>
              </ReactCarousel.Item>
            ))}
          </ReactCarousel>
        </Container>
      </section>
    </>
  )
}

export default Carousel
