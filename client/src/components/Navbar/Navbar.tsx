import { NavLink } from "react-router-dom"
import styles from "./Navbar.module.css"
import { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "../../contexts/UserContext"

function Navbar() {
  const navbarRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    /**
     * Defines the style of the navbar and logo based on scroll postion on the page
     */
    function onScroll() {
      if (!navbarRef.current) return
      if (!logoRef.current) return

      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        navbarRef.current.style.padding = "0px 10px"
        logoRef.current.style.opacity = "0"
      } else {
        navbarRef.current.style.padding = "50px 10px"
        logoRef.current.style.opacity = "1"
      }
    }

    window.addEventListener("scroll", onScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  const handleClickScrollBrowse = () => {
    const element = document.getElementById("browse")
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    }
  }

  const ctx = useContext(UserContext)
  if (!ctx) throw new Error("User is undefined")
  const { user, updateUser } = ctx
  const name = user.fname

  useEffect(() => {}, [user])

  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const toggleMenu = () => setShowMobileMenu((prev) => !prev)

  const isLoggedIn = () => !(user.id === 0)

  return (
    <>
      <header>
        <div className={styles.navbar} ref={navbarRef}>
          <NavLink to={"/"} className={styles.logo}>
            <img
              className={styles.logoel1}
              ref={logoRef}
              src="/images/logo/332096491_571562201699624_6671416270433743475_n.png"
              alt=""
            />
            <div className={styles.logoel2} onClick={toggleMenu}>
              the vinyl countdown
            </div>
          </NavLink>
          <div
            className={
              showMobileMenu ? styles.navbarRightResponsive : styles.navbarRight
            }
          >
            <a
              className={showMobileMenu ? styles.iconResponsive : styles.icon}
              onClick={toggleMenu}
            >
              <i className="fa fa-bars"></i>
            </a>
            <NavLink
              className={(navData) =>
                navData.isActive
                  ? `${styles.navbarRightLink} ${styles.active}`
                  : styles.navbarRightLink
              }
              to={"/"}
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                toggleMenu()
              }}
            >
              Home
            </NavLink>
            <NavLink
              className={styles.navbarRightLink}
              to={"/#browse"}
              onClick={() => {
                handleClickScrollBrowse()
                toggleMenu()
              }}
            >
              Browse
            </NavLink>
            {isLoggedIn() ? (
              <NavLink
                to={"/"}
                onClick={() => {
                  updateUser({ id: 0, fname: "", lname: "" })
                  toggleMenu()
                }}
                className={styles.navbarRightLink}
              >
                Logout
              </NavLink>
            ) : (
              <NavLink
                to={"/login"}
                className={(navData) =>
                  navData.isActive
                    ? `${styles.navbarRightLink} ${styles.active}`
                    : styles.navbarRightLink
                }
                onClick={() => {
                  toggleMenu()
                }}
              >
                Login
              </NavLink>
            )}
            <NavLink
              to={"/cart"}
              className={(navData) =>
                navData.isActive
                  ? `${styles.navbarRightLink} ${styles.active}`
                  : styles.navbarRightLink
              }
              onClick={() => {
                toggleMenu()
              }}
            >
              {isLoggedIn() ? (
                <>
                  <span
                    style={{
                      textDecoration: "underline",
                      textDecorationThickness: "2px",
                    }}
                  >
                    {user?.fname}
                  </span>
                  {"'s Cart"}
                </>
              ) : (
                "Cart"
              )}
            </NavLink>
          </div>
        </div>
      </header>
      <div className={styles.empty} />
    </>
  )
}

export default Navbar
