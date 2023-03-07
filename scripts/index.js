const loginLink = document.getElementById('login-link')
const cartLink = document.getElementById('cart-link')
//Logout link has a default display of nones
const logoutLink = document.getElementById('logout-link')
logoutLink.style.display = 'none'

const userInfo = JSON.parse(localStorage.getItem('userInfo'))

if (userInfo) {
  console.log(userInfo)
  logoutLink.style.display = 'block'
  loginLink.style.display = 'none'

  const splitName = userInfo.user.split(' ')

  cartLink.textContent = `${splitName[0]}´s Cart`

  logoutLink.addEventListener('click', () => {
    localStorage.removeItem('userInfo')
  })
}
