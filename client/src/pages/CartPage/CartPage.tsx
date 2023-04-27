import {useEffect, useState} from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import BasketSummary from "../../components/BasketSummary/BasketSummary";
import {Basket} from "../../../../api/src/baskets/baskets.model";
import Cart from "../../components/Cart/Cart";

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
                        <Cart id={basket.id}
                              BasketId={basket.BasketId}
                              products={basket.products}
                              total={basket.total}>
                        </Cart>
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

    // return (
    //     <Container>
    //         <Row>
    //             <Col sm={8}>
    //                 <Card>
    //                     <Card.Body>
    //                         Hello
    //                     </Card.Body>
    //                 </Card>
    //             </Col>
    //             <Col sm={4}>
    //                 <Card>
    //                     <Card.Body>
    //                         Summary
    //                     </Card.Body>
    //                 </Card>
    //             </Col>
    //         </Row>
    //     </Container>
    // )
}


export default CartPage
