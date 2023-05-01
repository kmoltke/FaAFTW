import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Carousel.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function ImageCarousel() {
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

export default ImageCarousel;
