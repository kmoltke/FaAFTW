import { NavLink } from "react-router-dom"
import { useState } from "react"
import Button from "react-bootstrap/Button"

import "../../styles/template.css"
import "./Tabs.css"
import { LoginForm } from "../LoginForm/LoginForm"
import { RegisterForm } from "../RegisterForm/RegisterForm"

const Tabs = () => {
  const [ActiveTab, setJustifyActive] = useState("login")

  const handleJustifyClick = (value: any) => {
    if (value === ActiveTab) {
      return
    }
    setJustifyActive(value)
  }

  return (
    <div>
      <div className="Container">
        <Button
          className="Button"
          variant="dark"
          onClick={() => handleJustifyClick("login")}
          active={ActiveTab === "login"}
        >
          Login
        </Button>
        <Button
          className="Button"
          variant="dark"
          onClick={() => handleJustifyClick("register")}
          active={ActiveTab === "register"}
        >
          Register
        </Button>
      </div>

      <div></div>
      {ActiveTab === "login" ? <LoginForm /> : <RegisterForm />}
    </div>
  )
}
export default Tabs
