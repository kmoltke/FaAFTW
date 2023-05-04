import { useContext, useState } from 'react'
import styles from './LoginForm.module.css'
// import { useUserContext } from "../../contexts/UserContext"
import { useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'

type FormError = {
  name?: string
  email?: string
  password?: string
  general?: string
}

export const LoginForm = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>()
  const [formErrors, setFormErrors] = useState<FormError>()
  // const { user, updateUser } = useUserContext()
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('User is undefined')

  const { user, updateUser } = ctx

  const handleEmailInput = (e: any) => {
    setEmail(e.target.value)
  }

  const handlePasswordInput = (e: any) => {
    setPassword(e.target.value)
  }

  const handleFormSubmit = async (e: any) => {
    e.preventDefault()

    if (email === '' && password === '') {
      setFormErrors({ general: 'Please fill in the required data to login' })
      return
    }

    const response = await fetch('http://localhost:5000/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (response.status !== 200) {
      setFormErrors({
        general:
          'Looks like either your email address or password were incorrect. Wanna try again?',
      })
      return
    }

    const data = await response.json()

    updateUser(data.user)
    navigate('/')
  }

  return (
    <div className="d-flex justify-content-center">
      <form
        onSubmit={handleFormSubmit}
        // action="http://127.0.0.1:5500/index.html"
        className={`p-3 ${styles.loginForm}`}
        id="loginForm"
      >
        <div className="form-group pb-3">
          <label htmlFor="emailInput">Email</label>
          <input
            onChange={handleEmailInput}
            type="email"
            value={email}
            className="form-control"
            id="emailInput"
          />
        </div>
        <div className="form-group pb-3">
          <label htmlFor="passwordInput">Password</label>
          <input
            onChange={handlePasswordInput}
            type="password"
            value={password}
            className="form-control"
            id="passwordInput"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 login-button">
          Login
        </button>
        {formErrors?.general && (
          <div className={styles.errorContainer}>
            <div className={styles.error}>{formErrors?.general}</div>
          </div>
        )}
      </form>
    </div>
  )
}
