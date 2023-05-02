import "./styles/template.css"
import "./styles/basket.css"
import "bootstrap/dist/css/bootstrap.min.css"
import {User, UserContext, UserProvider} from "./contexts/UserContext";
// import {Cart, CartContext, cartItem} from "./contexts/CartContext";

import Router from "./router/Router"

// import {UserContextProvider} from "./contexts/UserContext"
import {useState} from "react";
import {CartContext, CartProvider} from "./contexts/CartContext";

export function App() {
    // const [currUser, updateState] = useState<User>(
    //     {id: 0, fname: "", lname: ""}
    // )
    // const updateUserFunc = (newUser: User) => {
    //     updateState(newUser)
    // }
    //
    // const [cart, updateCart] = useState<cartItem[]>([])
    // // const updateCartFunc = (newProd: cartItem) => {
    // //     updateCart(newProd)
    // // }

    return (
        <CartProvider>
            <UserProvider>
                <Router></Router>
            </UserProvider>
        </CartProvider>



        // <UserContext.Provider value={{user: currUser, updateUser: updateUserFunc}}>
        //     <CartContext.Provider value={{cart, updateCart}}>
        //         <Router></Router>
        //     </CartContext.Provider>
        // </UserContext.Provider>
    )
}

// export default App
