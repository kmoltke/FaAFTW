import "./styles/template.css"
import "./styles/navbar.css"
import "./styles/basket.css"

import Navbar from "./components/Navbar"
import Router from "./router/Router"

function App() {
  return (
    <Router>
      <Navbar />
    </Router>
  )
}

export default App
