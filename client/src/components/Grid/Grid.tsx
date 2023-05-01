import GridCard from '../GridCard/GridCard'
import './Grid.css'

function Grid(props: any) {
  const { products } = props
  console.log(products)

  return (
    <div className="grid">
      {products.map((product: any) => {
        return (
          <GridCard
            key={product.id}
            id={product.id}
            title={product.album}
            artist={product.artist}
            imageSrc={product.imageSrc}
            price={product.price}
          ></GridCard>
        )
      })}
    </div>
  )
}

export default Grid
