import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "../components/LoginPage"
import CartPage from "../components/CartPage"
import HomePage from "../components/HomePage"
import Navbar from "../components/Navbar"

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
