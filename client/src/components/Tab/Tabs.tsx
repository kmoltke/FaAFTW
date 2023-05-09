import styles from "./Tabs.module.css"

import { useState } from "react"
import Button from "react-bootstrap/Button"

import { LoginForm } from "../LoginForm/LoginForm"
import { RegisterForm } from "../RegisterForm/RegisterForm"

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("login")

  return (
    <div>
      <div className={styles.container}>
        <Button
          className={styles.button}
          variant="dark"
          onClick={() => setActiveTab("login")}
          active={activeTab === "login"}
        >
          Login
        </Button>
        <Button
          className={styles.button}
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
