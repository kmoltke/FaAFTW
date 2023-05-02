import { NavLink } from "react-router-dom"
// import { useUserContext } from "../../contexts/UserContext"
import styles from "./Navbar.module.css"
import {useContext, useState} from "react"
import {UserContext} from "../../contexts/UserContext";

function Navbar() {
  const ctx = useContext(UserContext)
  if (!ctx)
    throw new Error("User is undefined")
  const { user, updateUser } = ctx
  console.log(user)

  const [responsive, setResponsive] = useState("")

  const burger = () => {
    responsive === "" ? setResponsive("responsive") : setResponsive("")
  }

  return (
    <>
      <header>
        <div className={styles.navbar}>
          <a href="#default" className={styles.logo}>
            <img
              className={styles.logoel1}
              src="/images/logo/332096491_571562201699624_6671416270433743475_n.png"
              alt=""
            />
            <div className={styles.logoel2}>the vinyl countdown</div>
          </a>
          <div className={styles.navbarRight + responsive}>
            <a className={styles.icon + responsive} onClick={burger}>
              <i className="fa fa-bars"></i>
            </a>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/browse"}>Browse</NavLink>
            {!(user.id===0) ? (
              <NavLink
                to={"/"}
                onClick={() => updateUser({id:0,fname:"",lname:""})}
                className={styles.navItem}
              >
                Logout
              </NavLink>
            ) : (
              <NavLink to={"/login"} className={styles.navItem}>
                Login
              </NavLink>
            )}
            <NavLink to={"/cart"} className={styles.navItem}>
              {!(user.id===0) ? (
                <>
                  <span style={{ color: "#f23737" }}>{user.fname}</span>
                  {"'s Cart"}
                </>
              ) : (
                "Cart"
              )}
            </NavLink>
          </div>
        </div>
      </header>
      <div
        style={{
          paddingTop: "150px",
        }}
      />
    </>
  )
}

export default Navbar
