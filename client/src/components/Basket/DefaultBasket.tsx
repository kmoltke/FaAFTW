import {Card, Col, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import BasketSummary from "../BasketSummary/BasketSummary";
import BasketItem from "../BasketItem/BasketItem";
import {CartContext, CartItem} from "../../contexts/CartContext";

function DefaultBasket() {
    const {cartState} = useContext(CartContext)
    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        const newTotal = calcTotal(cartState.items)
        setTotal(newTotal)
    }, [cartState.items])

    function calcTotal(cartItems: CartItem[]) {
        return cartItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    }


    return (
        <Card>
            <Row>
                <Col sm={8}>
                    <h3>Products</h3>
                    <hr/>
                    {cartState.items.map((prod: CartItem) => {
                        return (
                            <BasketItem id={prod.id}
                                        artist={prod.artist}
                                        album={prod.album}
                                        quantity={prod.quantity}
                                        price={prod.price}
                                        image={prod.image}></BasketItem>
                        )
                    })}
                </Col>
                <Col sm={4}>
                    <h3>Summary</h3>
                    <hr/>
                    <BasketSummary total={total}></BasketSummary>
                </Col>
            </Row>
        </Card>
    )
}

export default DefaultBasket