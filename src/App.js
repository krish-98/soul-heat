import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"

// Components imports
import Header from "./components/Header"
import Body from "./components/Body"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Restaurant from "./pages/Restaurant"
import ErrorPage from "./pages/ErrorPage"
import Cart from "./pages/Cart"
import Success from "./pages/Success"
import Cancel from "./pages/Cancel"

// Redux imports
import { Provider, useDispatch } from "react-redux"
import store from "./app/store"

// firebase imports
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./configs/firebase.config"
import { authenticateUser } from "./features/authSlice"

// Toastify imports
import { ToastContainer } from "react-toastify"
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
      { path: "/", element: <Body /> },
      { path: "restaurant/:resId", element: <Restaurant /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "cart", element: <Cart /> },
      { path: "success", element: <Success /> },
      { path: "cancel", element: <Cancel /> },
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
