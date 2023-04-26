import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "../pages/LoginPage/LoginPage"
import CartPage from "../pages/CartPage/CartPage"
import HomePage from "../pages/HomePage/HomePage"
import Navbar from "../components/Navbar/Navbar"

function Router(props: any) {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/browse" Component={() => <div>browse</div>} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/cart" Component={CartPage} />
        <Route path="/" Component={HomePage} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
