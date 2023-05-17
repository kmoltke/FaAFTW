import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { LoginPage } from "../pages/LoginPage/LoginPage"
import CartPage from "../pages/CartPage/CartPage"
import HomePage from "../pages/HomePage/HomePage"
import ProductDescriptionPage from "../pages/ProductDescriptionPage/ProductDescriptionPage"
import Root from "./Root"

function Router(props: any) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          path: "",
          element: <HomePage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "cart",
          element: <CartPage />,
        },
        {
          path: "products/:id",
          element: <ProductDescriptionPage />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default Router
