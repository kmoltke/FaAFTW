import { Container } from 'react-bootstrap'
import DefaultBasket from '../../components/Basket/DefaultBasket'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import UserBasket from '../../components/Basket/UserBasket'

function CartPage() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('UserContext undefined')
  const { user } = ctx
  const isLoggedIn = () => user.id

  return (
    <Container>{isLoggedIn() ? <UserBasket /> : <DefaultBasket />}</Container>
  )
}

export default CartPage
