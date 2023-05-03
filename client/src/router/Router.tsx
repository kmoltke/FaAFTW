import {
  BrowserRouter,
  Route,
  Routes,
  ScrollRestoration,
} from "react-router-dom"
import { LoginPage } from "../pages/LoginPage/LoginPage"
import CartPage from "../pages/CartPage/CartPage"
import HomePage from "../pages/HomePage/HomePage"
import Navbar from "../components/Navbar/Navbar"
import ProductDescriptionPage from "../pages/ProductDescriptionPage/ProductDescriptionPage"

function Router(props: any) {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" Component={LoginPage} />
        <Route path="/cart" Component={CartPage} />
        <Route path="/" Component={HomePage} />
        <Route path="/products/:id" element={<ProductDescriptionPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
