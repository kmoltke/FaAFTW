import './styles/template.css'
import './styles/navbar.css'
import './styles/basket.css'

import Router from './router/Router'
import { LoginForm } from './components/LoginForm/LoginForm'

function App() {
  return (
    <>
      <Router />
      <LoginForm />
    </>
  )
}

export default App
