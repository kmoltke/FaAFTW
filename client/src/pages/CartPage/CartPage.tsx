import styles from "./CartPage.module.css"

import UserBasket from "../../components/Basket/UserBasket"
import GoBackButton from "../../components/GoBackButton/GoBackButton"

function CartPage() {
  return (
    <main>
      <GoBackButton />
      <section>
        <h1>Your cart</h1>
        <div className={styles.container}>
          <UserBasket />
        </div>
      </section>
    </main>
  )
}

export default CartPage
