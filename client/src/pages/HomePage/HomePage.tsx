import { useEffect, useState } from "react"
import GridCard from "../../components/GridCard/GridCard"
import Grid from "../../components/Grid/Grid"

function HomePage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const api = async () => {
      const data = await fetch("http://localhost:5000/products")
      const jsonData = await data.json()
      setProducts(jsonData)
    }

    api()
  }, [])

  console.log(products)

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
