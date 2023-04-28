import { useParams } from "react-router-dom"
import "./ProductDescriptionPage.css"
import vinyls from '../../../../api/data/vinyls.json';

const addToCart = () => {
  
}

type Vinyl = {
  id: number
  artist: string
  album: string
  decade: string
  year: number
  genre: string
  price: number
  type: string
  label: string
  image: string
  description: string
}


function ProductDescriptionPage(): JSX.Element {
  const { id } = useParams() 
  const path = "/products/" + id
  const vinyl = vinyls.find((vinyl) => vinyl.id === id) as Vinyl 

return (
<div className="container">
    <h1> Product description - {id} </h1>
    <section>
      <div className="productOuter" id="productOuter">
        <div className="productImage"> {vinyl.image}</div>
        <div className="productOverview" id="productOverview"></div>
        <h1 className="productTitle"> {vinyl.album}</h1>
        <h3 className="productArtist"> {vinyl.artist}</h3>
        <p className="productPrice"> {vinyl.price}</p>
        <button onClick={addToCart}> Add to Cart </button>
      </div>
      <div className="productDetails" id="productDetails"></div>
      <p> Year: {vinyl.year} </p>
      <p> Genre: {vinyl.genre} </p>
      <p> Type: {vinyl.type} </p>
      <p> Label: {vinyl.label} </p>
    </section>
  </div>
)
};

export default ProductDescriptionPage


