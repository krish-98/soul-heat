import React from "react"
import ReactDOM from "react-dom/client"
import Header from "./components/Header"
import Body from "./components/Body"

import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import ErrorPage from "./components/ErrorPage"
import About from "./components/About"
import Contact from "./components/Contact"
import RestaurantMenu from "./components/RestaurantMenu"

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "restaurant/:resId",
        element: <RestaurantMenu />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(<RouterProvider router={appRouter} />)
