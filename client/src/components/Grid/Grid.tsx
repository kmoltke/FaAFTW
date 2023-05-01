import GridCard from "../GridCard/GridCard"
import styles from "./Grid.module.css"

function Grid(props: any) {
  const { products } = props
  console.log(products)

  return (
    <div className={styles.grid}>
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
