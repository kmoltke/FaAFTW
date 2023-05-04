import GridCard from '../GridCard/GridCard'
import styles from './Grid.module.css'

function Grid(props: any) {
  const { products } = props
  const missing = 5 - products.length
  const emptyDivs = []

  for (let i = 0; i < missing; i++) {
    emptyDivs.push(<div />)
  }

  return (
    <div className={styles.grid}>
      {products.map((product: any) => {
        return (
          <GridCard
            key={product.id}
            id={product.id}
            album={product.album}
            artist={product.artist}
            imageSrc={product.imageSrc}
            price={product.price}
          ></GridCard>
        )
      })}
      {emptyDivs}
    </div>
  )
}

export default Grid
