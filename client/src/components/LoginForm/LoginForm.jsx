import { useState } from 'react'
import './login-form.css'

export const LoginForm = () => {
  const [fname, setFName] = useState()
  const [lname, setLName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleFNameInput = (e) => {
    setFName(e.target.value)
  }

  const handleLNameInput = (e) => {
    setLName(e.target.value)
  }

  const handleEmailInput = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordInput = (e) => {
    setPassword(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    console.log({ email, fname, lname, password })

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, fname, lname, password }),
    }).then((data) => console.log(data))
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
          <label htmlFor="firstNameInput">First Name</label>
          <input
            onChange={handleFNameInput}
            type="text"
            value={fname}
            className="form-control"
            id="firstNameInput"
          />
        </div>
        <div className="form-group pb-3">
          <label htmlFor="lastNameInput">Last Name</label>
          <input
            onChange={handleLNameInput}
            type="text"
            value={lname}
            className="form-control"
            id="lastNameInput"
          />
        </div>
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
