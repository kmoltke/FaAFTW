import {Basket} from "../../../../api/src/baskets/baskets.model";
import {Card, Col, Container, Row} from "react-bootstrap";

function UserBasket(props: {id: number}) {

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

export default UserBasket