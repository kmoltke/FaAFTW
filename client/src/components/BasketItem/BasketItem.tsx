import {CartItem} from "../../contexts/CartContext";

function BasketItem(props: CartItem) {

    //TODO: Style 'n shit
    return (
        <div>
            <p>{props.album}</p>
            <p>{props.artist}</p>
        </div>
    )
}

export default BasketItem