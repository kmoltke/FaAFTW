import "./styles/template.css"
import "./styles/basket.css"
import "bootstrap/dist/css/bootstrap.min.css"

import Router from "./router/Router"

import { UserContextProvider } from "./contexts/UserContext"

function App() {
  return (
    <>
      <UserContextProvider>
        <Router />
      </UserContextProvider>
    </>
  )
}

export default App
