import {NavLink} from "react-router-dom"
import styles from "./Navbar.module.css"
import {useContext, useEffect, useState} from "react"
import {UserContext} from "../../contexts/UserContext";

function Navbar() {

    const ctx = useContext(UserContext)
    if (!ctx)
        throw new Error("User is undefined")
    const {user, updateUser} = ctx
    const name = user.fname
    console.log("Navbaruser", user)

    useEffect(() => {
        console.log('Navbar user effect:', user);
    }, [user]);

    const [responsive, setResponsive] = useState("")

    const burger = () => {
        responsive === "" ? setResponsive("responsive") : setResponsive("")
    }

    const isLoggedIn = () => !(user.id === 0)


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
                        {isLoggedIn() ? (
                            <NavLink
                                to={"/"}
                                onClick={() => updateUser({id: 0, fname: "", lname: ""})}
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
                            {isLoggedIn() ? (
                                <>
                                    {console.log("NavLink user", user)}
                                    {console.log("Navlink fname:", name)}
                                    <span style={{color: "#f23737"}}>{user?.fname}</span>
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
