import "./styles/template.css"
import "./styles/basket.css"
import "bootstrap/dist/css/bootstrap.min.css"
import {User, UserContext} from "./contexts/UserContext";
import {Cart, CartContext, cartItem} from "./contexts/CartContext";

import Router from "./router/Router"

// import {UserContextProvider} from "./contexts/UserContext"
import {useState} from "react";

export function App() {
    const [currUser, updateState] = useState<User>(
        {id: 0, fname: "", lname: "", products: []}
    )
    const updateUserFunc = (newUser: User) => {
        updateState(newUser)
    }

    // const [cart, updateCart] = useState<Cart>(
    //     {products: [], total: 0}
    // )
    // const updateCartFunc = (newProd: cartItem) => {
    //     updateCart(newProd)
    // }

    return (
        <UserContext.Provider value={{user: currUser, updateUser: updateUserFunc}}>
            {/*<CartContext.Provider value={{cart: cart, updateCart: updateCartFunc}}>*/}
                <Router></Router>
            {/*</CartContext.Provider>*/}
        </UserContext.Provider>
    )
}

// export default App
