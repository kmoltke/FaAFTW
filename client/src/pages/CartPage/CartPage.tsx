import { Container } from "react-bootstrap"
import DefaultBasket from "../../components/Basket/DefaultBasket"
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import UserBasket from "../../components/Basket/UserBasket"
import GoBackButton from "../../components/GoBackButton/GoBackButton"

function CartPage() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error("UserContext undefined")
  const { user } = ctx
  const isLoggedIn = () => user.id

  return (
    <>
      <GoBackButton />
      <Container>{isLoggedIn() ? <UserBasket /> : <DefaultBasket />}</Container>
    </>
  )
}

export default CartPage
