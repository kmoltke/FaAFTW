import { useParams } from "react-router-dom"
import { NavLink } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar"

function ProductDescriptionPage() {
  const { id } = useParams()
  return (
    <div className="container">
      <h1>Products Details Page - {id}</h1>
    </div>
  )
}

export default ProductDescriptionPage
