import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"

import Header from "./components/Header"
import Body from "./components/Body"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Restaurant from "./pages/Restaurant"
import ErrorPage from "./pages/ErrorPage"
import Cart from "./pages/Cart"

import { Provider, useDispatch } from "react-redux"
import store from "./app/store"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./configs/firebase.config"
import { authenticateUser } from "./features/authSlice"

import { ToastContainer, toast } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

const AppLayout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(authenticateUser(user?.providerData?.[0]))
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <>
      <ToastContainer />
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
