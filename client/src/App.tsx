import "./styles/template.css"
import "./styles/basket.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { UserProvider } from "./contexts/UserContext"

import Router from "./router/Router"
import { CartProvider } from "./contexts/CartContext"

export const App = () => {
  return (
    <CartProvider>
      <UserProvider>
        <Router />
      </UserProvider>
    </CartProvider>
  )
}
