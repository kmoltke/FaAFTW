import {useContext, useEffect, useState} from "react"
import {Card, Col, Container, Row} from "react-bootstrap"
import BasketSummary from "../../components/BasketSummary/BasketSummary"
import {Basket} from "../../../../api/src/baskets/baskets.model"
import {UserContext} from "../../contexts/UserContext";
import UserBasket from "../../components/Basket/UserBasket";
import DefaultBasket from "../../components/Basket/DefaultBasket";

function CartPage() {
    const emptyBasket: Basket = {
        id: 0,
        BasketId: 0,
        products: [],
        total: 0,
    }
    const [basket, setProducts] = useState(emptyBasket)
    const ctx = useContext(UserContext)

    if (!ctx) {
        throw new Error("User is undefined")
    }

    const isLoggedIn = () => !(ctx.user.id === 0)

    const usrId = ctx.user.id

    // useEffect(() => {
    //     fetch(`http://localhost:5000/users/${usrId}/basket`)
    //         .then(res => res.json())
    //         .then(b => setProducts(b))
    // }, [])
    console.log(usrId)

    return (
        <Container>
            {isLoggedIn() ? (<UserBasket id={usrId}></UserBasket>) : (<DefaultBasket></DefaultBasket>)}
        </Container>
        // <Container>
        //     <Card>
        //         <Row>
        //             <Col sm={8}>
        //                 <h3>Products</h3>
        //                 <hr/>
        //                 {isLoggedIn() ? (<UserBasket id={usrId}></UserBasket>) : (<DefaultBasket></DefaultBasket>)}
        //
        //             </Col>
        //             <Col sm={4}>
        //                 <h3>Summary</h3>
        //                 <hr/>
        //                 <BasketSummary total={basket.total}></BasketSummary>
        //             </Col>
        //         </Row>
        //     </Card>
        // </Container>
    )
}


export default CartPage
