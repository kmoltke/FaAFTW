import styles from "./CartPage.module.css"

import Basket from "../../components/Basket/Basket"
import GoBackButton from "../../components/GoBackButton/GoBackButton"

function CartPage() {
  return (
    <main>
      <GoBackButton />
      <section>
        <h1>Your cart</h1>
        <div className={styles.container}>
          <Basket />
        </div>
      </section>
    </main>
  )
}

export default CartPage
