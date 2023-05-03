import {Container} from "react-bootstrap"
import DefaultBasket from "../../components/Basket/DefaultBasket";
import {useContext} from "react";
import {UserContext} from "../../contexts/UserContext";
import UserBasket from "../../components/Basket/UserBasket";

function CartPage() {
    const ctx = useContext(UserContext)
    if (!ctx)
        throw new Error("UserContext undefined")
    const {user, updateUser} = ctx
    const isLoggedIn = () => !(user.id === 0)


    return (
        <Container>
            {isLoggedIn() ? (
                <UserBasket></UserBasket>
            ) : (
                <DefaultBasket></DefaultBasket>
            )}
        </Container>
    )
}

export default CartPage