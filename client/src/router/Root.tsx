import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import { ToastContainer } from "react-toastify"

export default function Root() {
  return (
    <>
      <Navbar />
      <ToastContainer hideProgressBar />
      <Outlet />
    </>
  )
}
