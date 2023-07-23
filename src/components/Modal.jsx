import SignUp from "./SignUp"
import { CgClose } from "react-icons/cg"
import logo3 from "../assets/logo3.png"
import { useEffect, useState } from "react"
import Login from "./Login"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../configs/firebase.config"
import { useDispatch, useSelector } from "react-redux"
import { authenticateUser } from "../features/authSlice"

const Modal = ({ showAndCloseModal }) => {
  const [newUser, setNewUser] = useState(true)
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.auth)
  const googleProvider = new GoogleAuthProvider()

  useEffect(() => {
    if (user) {
      showAndCloseModal()
    }
  }, [user])

  const signInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider)
      dispatch(authenticateUser(response?.user?.providerData?.[0]))
    } catch (error) {
      console.error(error)
      console.error(error.code)
      console.error(error.message)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-white h-screen">
      <div className="flex h-screen bg-[#fb923c] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {/* Close icon */}
        <div
          className="absolute ring ring-white rounded-full top-16 right-6 md:right-[4.5rem] lg:right-36 lg:top-16 cursor-pointer"
          onClick={showAndCloseModal}
        >
          <CgClose className="w-8 h-8 md:h-9 md:w-9" />
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img src={logo3} alt="soul heat logo" />

          {/* <div className="flex justify-between">
            <h2
              onClick={() => setNewUser(true)}
              className={`text-center text-2xl font-semibold tracking-tight bg-white text-[#fb923c] w-full py-2 border-r ${
                newUser && "bg-opacity-80"
              }`}
            >
              Sign Up
            </h2>
            <h2
              onClick={() => setNewUser(false)}
              className={`text-center text-2xl font-semibold tracking-tight bg-white text-[#fb923c] w-full py-2 border-r ${
                !newUser && "bg-opacity-80"
              }`}
            >
              Login
            </h2>
          </div> */}
        </div>

        {newUser ? (
          <SignUp
            handleUser={() => setNewUser(false)}
            googleSignIn={signInWithGoogle}
            showAndCloseModal={showAndCloseModal}
          />
        ) : (
          <Login
            handleUser={() => setNewUser(true)}
            googleSignIn={signInWithGoogle}
            showAndCloseModal={showAndCloseModal}
          />
        )}
      </div>
    </div>
  )
}

export default Modal
