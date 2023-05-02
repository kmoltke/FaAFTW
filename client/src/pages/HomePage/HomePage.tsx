import { useEffect, useState } from "react"
import GridCard from "../../components/GridCard/GridCard"
import Grid from "../../components/Grid/Grid"
import "../../styles/template.css"
import { useLocation, useNavigate } from "react-router-dom"
import Filter, { Filters } from "../../components/Filter/Filter"

function HomePage() {
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState<Filters>({})

  const navigate = useNavigate()
  const location = useLocation()

  const handleFilterChange = (filters: Filters) => {
    const queryParams = new URLSearchParams(filters).toString()
    navigate(`${location.pathname}?${queryParams}`)
  }
  const detectQueryParams = () => {
    const queryParams = new URLSearchParams(location.search)
    const genre = queryParams.get("genre")
    const artist = queryParams.get("artist")
    const decades = queryParams.get("decades")
    const initialFilter = { genre: genre, artist: artist, decades: decades }
    const filteredFilters = Object.fromEntries(
      Object.entries(initialFilter).filter(([_, value]) => value !== null)
    )
    setFilters(filteredFilters)
  }

  useEffect(() => {
    detectQueryParams()
  }, [])

  useEffect(() => {
    const filteredFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== "")
    )
    const queryParams = new URLSearchParams(filteredFilters).toString()
    handleFilterChange(filteredFilters)
    const url = "http://localhost:5000/products?" + queryParams

    fetch(url)
      .then((data) => {
        if (data.status === 204) {
          return []
        }
        return data.json()
      })
      .then(setProducts)
  }, [filters])

  return (
    <main>
      <section>
        <Filter
          value={filters}
          onChange={setFilters}
          itemsNum={products.length}
        />
      </section>

      <section>
        {products.length > 0 ? (
          <Grid products={products} />
        ) : (
          <h3>No products found</h3>
        )}
      </section>
    </main>
  )
}

export default HomePage
