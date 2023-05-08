import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";
import styles from "./Carousel.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function ImageCarousel() {
  const [products, setProducts] = useState<any[]>();

  useEffect(() => {
    fetch("http://localhost:5000/products/")
      .then((data) => data.json())
      .then((parsedData) => setProducts(parsedData));
  }, []);

  console.log("featured products from carousel", products);

  return (
    <>
      <div>
        <Container>
          <Row>
            <Col>
              <p className={styles.carouselh1}> Featured new releases </p>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row></Row>
          <Carousel>
            {products?.map((product) => {
              if (product?.featured) {
                return (
                  <Carousel.Item>
                    <Link to={"/products/" + product.id}>
                      <img
                        className={styles.carouselImg}
                        src={product?.image}
                      />
                    </Link>
                    <Carousel.Caption>
                      <p className={styles.carouselh3}> {product?.album} </p>
                      <p className={styles.carouselh3}> {product?.artist} </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              }
            })}
          </Carousel>
        </Container>
      </div>
    </>
  );
}

export default ImageCarousel;
