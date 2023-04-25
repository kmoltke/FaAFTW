import "./styles/template.css"
import "./styles/navbar.css"
import "./styles/basket.css"

import Navbar from "./components/Navbar"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import HomePage from "./components/HomePage"
import CartPage from "./components/CartPage"
import LoginPage from "./components/LoginPage"

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route path="/browse" component={() => <div>browse</div>} />
          <Route path="/login" component={LoginPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
