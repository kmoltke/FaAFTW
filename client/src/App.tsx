import './styles/template.css'
import './styles/basket.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserProvider } from './contexts/UserContext'

import Router from './router/Router'
import { CartProvider } from './contexts/CartContext'
import { ScrollRestoration } from 'react-router-dom'

export const App = () => {
  return (
    <CartProvider>
      <UserProvider>
        <Router>
          <ScrollRestoration />
        </Router>
      </UserProvider>
    </CartProvider>
  )
}
