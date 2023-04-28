import { useState } from 'react'
import './login-form.css'

export const LoginForm = () => {
  const [fName, setFName] = useState()
  const [lName, setLName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleFullNameInput = (e) => {
    const [firstName, lastName] = e.target.value.split(' ')
    console.log(e.target.value)
    setFName(firstName)
    setLName(lastName)
  }

  const handleEmailInput = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordInput = (e) => {
    setPassword(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    console.log({ fName, lName, email, password })

    fetch('/localhost:5000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, fName, lName, password }),
    })
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
          <label htmlFor="fullNameInput">Full Name</label>
          <input
            onChange={handleFullNameInput}
            type="text"
            className="form-control"
            id="fullNameInput"
          />
        </div>
        <div className="form-group pb-3">
          <label htmlFor="emailInput">Email</label>
          <input
            onChange={handleEmailInput}
            type="email"
            className="form-control"
            id="emailInput"
          />
        </div>
        <div className="form-group pb-3">
          <label htmlFor="passwordInput">Password</label>
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
          <label className="form-check-label" htmlFor="rememberMeCheckbox">
            Remember me
          </label>
        </div>
      </form>
    </div>
  )
}
