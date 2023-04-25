import { NavLink } from "react-router-dom"

function Navbar() {
  const burger = () => {
    alert("it works")
  }

  return (
    <>
      <header>
        <div className="navbar" id="navbar">
          <a href="#default" id="logo">
            <img
              id="logoel1"
              src="/images/logo/332096491_571562201699624_6671416270433743475_n.png"
              alt=""
            />
            <div id="logoel2">the vinyl countdown</div>
          </a>
          <div id="navbar-right" className="navbar-right">
            <a className="icon" onClick={burger}>
              <i className="fa fa-bars"></i>
            </a>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/browse"}>Browse</NavLink>
            <NavLink to={"/login"}>Login</NavLink>
            <NavLink to={"/cart"}>Cart</NavLink>
            {/* <a href="" id="logout-link">
            Logout
          </a> */}
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
