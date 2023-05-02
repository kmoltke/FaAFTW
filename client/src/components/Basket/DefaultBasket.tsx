import {Basket} from "../../../../api/src/baskets/baskets.model";
import {Card, Col, Container, Row} from "react-bootstrap";
import {useContext, useState} from "react";
import {CartContext, cartItem} from "../../contexts/CartContext";
import UserBasket from "./UserBasket";
import BasketSummary from "../BasketSummary/BasketSummary";
import GridCard from "../GridCard/GridCard";
import BasketItem from "../BasketItem/BasketItem";

function DefaultBasket() {
    const ctx = useContext(CartContext)
    if (!ctx)
        throw new Error("Cart is undefined")
    const cart = ctx.cart


    return (
        <Card>
            <Row>
                <Col sm={8}>
                    <h3>Products</h3>
                    <hr/>
                    {cart.products.map((prod: cartItem) => {
                        return (
                            <BasketItem itemId={0} quantity={prod.quantity}></BasketItem>
                        )
                    })}
                </Col>
                <Col sm={4}>
                    <h3>Summary</h3>
                    <hr/>
                    <BasketSummary total={cart.total}></BasketSummary>
                </Col>
            </Row>
        </Card>
    )
}

export default DefaultBasket