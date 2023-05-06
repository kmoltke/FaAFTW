import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
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

/*

   <Link to={"/products/" + product.id}>
                    <img className="carousel-img" src={product?.image} />
                  </Link>

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1> Featured new releases </h1>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row></Row>
        <Carousel>
          <Carousel.Item>
            <Link to="/products/1">
              <img
                className="carousel-img"
                src="/images/id11-1.jpg"
                alt="featured"
              />
              <Carousel.Caption>
                <p className="carousel h3">Abbey Road </p>
                <p className="carousel h3">The Beatles </p>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="/products/2">
              <img
                className="carousel-img"
                src="images/id2-1.jpg"
                alt="featured"
              />
              <Carousel.Caption>
                <p className="carousel h3">IV</p>
                <p className="carousel h3">Led Zeppelin</p>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="/products/">
              <img
                className="carousel-img"
                src="/images/id11-1.jpg"
                alt="featured"
              />
              <Carousel.Caption>
                <p className="carousel h3">Born to Die </p>
                <p className="carousel h2">Lana Del Rey</p>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        </Carousel>
      </Container>
    </>
  );
}

*/
