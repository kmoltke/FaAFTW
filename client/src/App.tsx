import './styles/template.css'
import './styles/navbar.css'
import './styles/basket.css'

import Router from './router/Router'
import GridCard from './components/GridCard/GridCard'

function App() {
  return (
    <>
      <Router />
      <GridCard />
    </>
  )
}

export default App
