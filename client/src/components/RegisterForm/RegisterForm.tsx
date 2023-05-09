import React, { useContext, useState } from "react"
import styles from "./RegisterForm.module.css"
import { useNavigate } from "react-router"
import { UserContext } from "../../contexts/UserContext"
import { User } from "../../types/types"

type FormError = {
  fname?: string
  lname?: string
  email?: string
  password?: string
  general?: string
}

export const RegisterForm = () => {
  const navigate = useNavigate()
  const [fname, setFName] = useState("")
  const [lname, setLName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [formErrors, setFormErrors] = useState<FormError>()

  const ctx = useContext(UserContext)
  if (!ctx) {
    throw new Error("Context is undefined")
  }
  const { user, updateUser } = ctx

  const emptyUser: User = {
    id: 0,
    fname: "",
    lname: "",
    email: "",
    password: "",
  }

  //validation
  const validatePassword = (password: string) => {
    const regPassword: RegExp =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
    if (password.length === 0) return { password: undefined }
    if (!regPassword.test(password))
      return {
        password:
          "Password requirements: 8-20 characters, 1 number, 1 letter, 1 symbol.",
      }
    return { password: undefined }
  }

  const validateFName = (name: string) => {
    const regName: RegExp = /^([a-zA-z]{2,}\s*)+$/
    if (!regName.test(name)) return { fname: "Not a valid first name" }
    if (name.length > 15)
      return { fname: "First name must be 15 characters of less" }
    return { fname: undefined }
  }

  const validateLName = (name: string) => {
    const regName: RegExp = /^([a-zA-z]{2,}\s*)+$/
    if (!regName.test(name)) return { lname: "Not a valid last name" }
    if (name.length > 15)
      return { lname: "Last name must be 15 characters of less" }
    return { lname: undefined }
  }

  const validateEmail = (email: string) => {
    const regName: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    if (!regName.test(email)) return { email: "Not a valid email" }
    return { email: undefined }
  }

  const validate = () => {
    const errors = {
      ...validatePassword(password),
      ...validateFName(fname),
      ...validateLName(lname),
      ...validateEmail(email),
    }
    setFormErrors(errors)
    return errors
  }

  const handleFNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFName(e.target.value)
    setFormErrors(undefined)
  }

  const handleLNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLName(e.target.value)
    setFormErrors(undefined)
  }

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setFormErrors(undefined)
  }

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setFormErrors(undefined)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (email === "" || password === "" || fname === "" || lname === "") {
      setFormErrors({
        general: "Please fill in the required data to register",
      })
      return
    }

    const errors = validate()

    if (errors.password || errors.fname || errors.lname || errors.email) {
      return
    }

    // Create user on DB:
    const userResponse = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, fname, lname, password }),
    })

    if (userResponse.status !== 200) {
      setFormErrors({
        general:
          "Looks like this email adress already exists... Wanna try again?",
      })
      return
    }

    const data = await userResponse.json()

    updateUser(data.user)
    navigate(-1)
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
          <label htmlFor="firstNameInput">First Name</label>
          <input
            onChange={handleFNameInput}
            type="text"
            value={fname}
            className="form-control"
            id="firstNameInput"
          />
          {formErrors?.fname && (
            <div className={styles.errorContainer}>
              <div className={styles.error}>{formErrors?.fname}</div>
            </div>
          )}
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
          {formErrors?.lname && (
            <div className={styles.errorContainer}>
              <div className={styles.error}>{formErrors?.lname}</div>
            </div>
          )}
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
          {formErrors?.email && (
            <div className={styles.errorContainer}>
              <div className={styles.error}>{formErrors?.email}</div>
            </div>
          )}
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
          {formErrors?.password && (
            <div className={styles.errorContainer}>
              <div className={styles.error}>{formErrors?.password}</div>
            </div>
          )}
        </div>
        <button type="submit" className={styles.button}>
          Register
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
