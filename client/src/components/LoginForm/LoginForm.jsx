import { useState } from 'react'
import './login-form.css'

export const LoginForm = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleNameInput = (e) => {
    setName(e.target.value)
  }

  const handleEmailInput = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordInput = (e) => {
    setPassword(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log({ name, email, password })
  }

  return (
    <div className="d-flex justify-content-center">
      <form
        onSubmit={handleFormSubmit}
        // action="http://127.0.0.1:5500/index.html"
        className="p-3 login-form"
        id="loginForm"
      >
        <div className="form-group pb-3">
          <label for="fullNameInput">Full Name</label>
          <input
            onChange={handleNameInput}
            type="text"
            className="form-control"
            id="fullNameInput"
          />
        </div>
        <div className="form-group pb-3">
          <label for="emailInput">Email</label>
          <input
            onChange={handleEmailInput}
            type="email"
            className="form-control"
            id="emailInput"
          />
        </div>
        <div className="form-group pb-3">
          <label for="passwordInput">Password</label>
          <input
            onChange={handlePasswordInput}
            type="password"
            className="form-control"
            id="passwordInput"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 login-button">
          Submit
        </button>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="rememberMeCheckbox"
          />
          <label className="form-check-label" for="rememberMeCheckbox">
            Remember me
          </label>
        </div>
      </form>
    </div>
  )
}
