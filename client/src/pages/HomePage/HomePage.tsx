import { useEffect, useState } from 'react'
import Grid from '../../components/Grid/Grid'
import '../../global.css'
import { useSearchParams } from 'react-router-dom'
import Filter from '../../components/Filter/Filter'
import { Carousel } from 'react-bootstrap'

function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)

      const url = 'http://localhost:5000/products?' + searchParams.toString()

      const response = await fetch(url)
      let data = []
      if (response.status === 204) {
        data = []
      } else {
        data = await response.json()
      }
      setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [searchParams])

  return (
    <main>
      <Carousel />
      <section id="browse">
        <Filter itemsNum={products.length} />
      </section>

      <section>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {products.length > 0 ? (
              <Grid products={products} />
            ) : (
              <h3>No products found</h3>
            )}
          </div>
        )}
      </section>
    </main>
  )
}

export default HomePage
