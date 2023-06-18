import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"

import Header from "./components/Header"
import Body from "./components/Body"
import About from "./components/About"
import Contact from "./components/Contact"
import Restaurant from "./components/Restaurant"
import ErrorPage from "./components/ErrorPage"
import Cart from "./components/Cart"

import { Provider, useDispatch } from "react-redux"
import store from "./app/store"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase"
import { authenticateUser, logout } from "./features/authSlice"

const AppLayout = () => {
  const dispatch = useDispatch()
  console.log("App")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(authenticateUser(user))
      }
    })

    return () => {
      unsubscribe()
    }
  }, [dispatch])

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
        element: <Restaurant />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>
)
