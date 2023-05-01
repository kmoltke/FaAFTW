import { useEffect, useState } from "react"
import GridCard from "../../components/GridCard/GridCard"
import Grid from "../../components/Grid/Grid"
import "../../styles/template.css"

function HomePage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((data) => data.json())
      .then((parsedData) => setProducts(parsedData))
  }, [])

  return (
    <div>
      <Grid products={products}></Grid>
    </div>
  )
  //add carousel component
  //add H2 title for browse(no component needed)
  //component for filter
  //component for the grid (a card component as well has to be defined)

  //button component
}

export default HomePage
