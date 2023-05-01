import {useEffect, useState} from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import BasketSummary from "../../components/BasketSummary/BasketSummary";
import { Basket } from "../../../../api/src/baskets/baskets.model";
import { BasketProduct} from "../../../../api/src/baskets/baskets.model";

function CartPage() {
    const emptyBasket: Basket = {
        id: 0,
        BasketId: 0,
        products: [],
        total: 0
    }

    const [basket, setProducts] = useState(emptyBasket)

    useEffect(() => {
        const api = async () => {
            const data = await fetch("http://localhost:5000/users/1680705564259/basket")
            const jsonData = await data.json()
            setProducts(jsonData)
        }

        api()
    }, [])


    return (
        <Container>
            <Card>
                <Row>
                    <Col sm={8}>
                        <h3>Products</h3>
                        <hr/>
                    </Col>
                    <Col sm={4}>
                        <h3>Summary</h3>
                        <hr/>
                        <BasketSummary total={basket.total}></BasketSummary>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}


export default CartPage
