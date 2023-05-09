import DefaultBasket from "../../components/Basket/DefaultBasket"
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import UserBasket from "../../components/Basket/UserBasket"
import GoBackButton from "../../components/GoBackButton/GoBackButton"
import styles from "./CartPage.module.css"

function CartPage() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error("UserContext undefined")
  const { user } = ctx
  const isLoggedIn = () => user.id

  return (
    <main>
      <GoBackButton />
      <section>
        <h1> Your cart</h1>
        <div className={styles.container}>
          {isLoggedIn() ? <UserBasket /> : <DefaultBasket />}
        </div>
      </section>
    </main>
  )
}

export default CartPage
