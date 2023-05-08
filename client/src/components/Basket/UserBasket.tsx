import {Card, Col, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import BasketSummary from "../BasketSummary/BasketSummary";
import BasketItem from "../BasketItem/BasketItem";
import {CartContext, CartItem, CartState} from "../../contexts/CartContext";
import {UserContext} from "../../contexts/UserContext";
import {Product} from "../../types/types";

interface Vinyl {
    id: number;
    album: string;
    artist: string;
    price: number;
    image: string;
    featured: boolean;
}

interface BasketItem {
    id: number;
    price: number;
    quantity: number;
}

interface Basket {
    id: number;
    basketId: number;
    products: BasketItem[];
}

function UserBasket() {
    const [dataCart, setDataCart] = useState<Basket | null>(null);
    const [vinyls, setVinyls] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [total, setTotal] = useState<number>(0);
    const {cartState} = useContext(CartContext);
    const userContext = useContext(UserContext);

    if (!userContext) {
        throw new Error("UserContext undefined");
    }

    const user = userContext.user;

    // const vins = fetch(`http://localhost:5000/products`).then(res => res.json())
    // setVinyls(vins)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const vinylsResponse = await fetch(`http://localhost:5000/products`);
                const vinylsData: Vinyl[] = await vinylsResponse.json();
                setVinyls(vinylsData);

                const cartResponse = await fetch(
                    `http://localhost:5000/users/${user.id}/basket`
                );
                const cartData: Basket = await cartResponse.json();
                setDataCart(cartData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [user.id, cartState.total]);

    useEffect(() => {
        if (dataCart && vinyls.length > 0) {
            const newCart: CartItem[] = dataCart.products.map((item) => {
                const v = vinyls.find((i) => i.id === item.id)
                if (!v)
                    throw new Error("Cannot find a vinyl with that id")

                return {
                    id: item.id,
                    artist: v.artist,
                    album: v.album,
                    price: v.price,
                    image: v.image,
                    quantity: item.quantity,
                };
            });
            setCart(newCart);
        }
    }, [user.id, cartState.total]);

    useEffect(() => {
        const newTotal = calcTotal(cart);
        setTotal(newTotal);
    }, [cartState.total]);

    function calcTotal(cartItems: CartItem[]) {
        return cartItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    }

    console.log("UserBasket rendered")

    return (
        <Card>
            <Row>
                <Col sm={8}>
                    <h3>Products</h3>
                    <hr/>
                    {dataCart?.products.map((prod: BasketItem) => {
                        const vinyl = vinyls.find(v => v.id === prod.id)
                        if (vinyl) {
                            return (
                                <BasketItem id={prod.id}
                                            artist={vinyl.artist}
                                            album={vinyl.album}
                                            quantity={prod.quantity}
                                            price={prod.price}
                                            image={vinyl.image}></BasketItem>
                            )

                        }


                    })}
                </Col>
                <Col sm={4}>
                    <h3>Summary</h3>
                    <hr/>
                    <BasketSummary total={cartState.total}></BasketSummary>
                </Col>
            </Row>
        </Card>
    )
}

export default UserBasket