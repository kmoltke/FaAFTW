import React, { useContext, useEffect, useState } from "react"
import "./RegisterForm.css"
// import { User } from "../../../../api/src/users/users.model"
import { Basket } from "../../../../api/src/baskets/baskets.model"
import { UserContext } from "../../contexts/UserContext"
import { User } from "../../contexts/UserContext";
import {useNavigate} from "react-router";

export const RegisterForm = () => {
  const [fname, setFName] = useState("")
  const [lname, setLName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // const emptyUser: User = {
  //   id: 0,
  //   fname: "",
  //   lname: "",
  //   email: "",
  //   password: "",
  // }

  // const [user, setUser] = useState(emptyUser)
  const nav = useNavigate()
  const ctx = useContext(UserContext)
  if (!ctx) {
    throw new Error("User is undefined")
  }

  const handleFNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFName(e.target.value)
  }

  const handleLNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLName(e.target.value)
  }

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log({ email, fname, lname, password })

    const data:{id:number,fname:string,lname:string,email:string,password:string} = await postData("http://localhost:5000/users")
    ctx.updateUser({id: data.id, fname: data.fname, lname:data.lname})
    console.log(data)
    //GO Back:
    nav(-1)
    // ctx.updateUser((data as User).id)
  }

  //TODO: Make this post
  const postData = async (url: string) => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, fname, lname, password }),
    }).then((response) => response.json())
    return response
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
