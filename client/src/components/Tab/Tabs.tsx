import { NavLink } from "react-router-dom"
import { useState } from "react"
import Button from "react-bootstrap/Button"

import "../../styles/template.css"
import "./Tabs.css"
import { LoginForm } from "../LoginForm/LoginForm"
import { RegisterForm } from "../RegisterForm/RegisterForm"

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("login")

  return (
    <div>
      <div className="Container">
        <Button
          className="Button"
          variant="dark"
          onClick={() => setActiveTab("login")}
          active={activeTab === "login"}
        >
          Login
        </Button>
        <Button
          className="Button"
          variant="dark"
          onClick={() => setActiveTab("register")}
          active={activeTab === "register"}
        >
          Register
        </Button>
      </div>

      <div></div>
      {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
    </div>
  )
}
export default Tabs
