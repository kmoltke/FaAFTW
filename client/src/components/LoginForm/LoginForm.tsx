import { useState } from "react"
import "./LoginForm.css"

export const LoginForm = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleEmailInput = (e: any) => {
    setEmail(e.target.value)
  }

  const handlePasswordInput = (e: any) => {
    setPassword(e.target.value)
  }

  const handleFormSubmit = (e: any) => {
    e.preventDefault()

    console.log({ email, password })

    fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
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
