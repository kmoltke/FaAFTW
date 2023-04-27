import {Basket} from "../../../../api/src/baskets/baskets.model"
import {BasketProduct} from "../../../../api/src/baskets/baskets.model";
import {Card, Col, Container, Row} from "react-bootstrap";


function Basket(basket: Basket) {

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
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}

export default Basket