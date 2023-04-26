import { useParams } from "react-router-dom"

function ProductDescriptionPage() {
  const { id } = useParams()
  return (
    <div className="container">
      <h1>Products Details Page - {id}</h1>
    </div>
  )
}

export default ProductDescriptionPage
