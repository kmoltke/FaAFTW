import { Product } from "../../types/types"
import GridCard from "../GridCard/GridCard"
import styles from "./Grid.module.css"

type Props = {
  products: Product[]
}

function Grid(props: Props) {
  const { products } = props
  const missing = 5 - products.length
  const emptyDivs = []

  for (let i = 0; i < missing; i++) {
    emptyDivs.push(<div key={i} />)
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => {
        return <GridCard product={product}></GridCard>
      })}
      {emptyDivs}
    </div>
  )
}

export default Grid
