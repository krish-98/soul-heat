import SignUp from './SignUp'
import { CgClose } from 'react-icons/cg'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import logo from '../assets/logo.png'
import { useEffect, useState } from 'react'
import SignIn from './SignIn'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../configs/firebase.config'
import { useDispatch, useSelector } from 'react-redux'
import { authenticateUser } from '../features/authSlice'
import { toggleModal } from '../features/modalSlice'

const Modal = () => {
  const [newUser, setNewUser] = useState(true)
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.auth)
  const { modal } = useSelector((store) => store.modal)
  const googleProvider = new GoogleAuthProvider()

  useEffect(() => {
    if (user) {
      dispatch(toggleModal(!modal))
    }
  }, [user])

  const showAndHideModal = () => {
    dispatch(toggleModal(!modal))
  }

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
        <div
          className="absolute top-12 right-6 md:right-[4.5rem] cursor-pointer lg:right-32 lg:top-10 xl:right-60"
          onClick={showAndHideModal}
        >
          <AiOutlineCloseCircle
            onClick={showAndHideModal}
            className="fill-white w-8 h-8 md:h-9 md:w-9"
          />
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img src={logo} alt="soul heat logo" />
        </div>
        {newUser ? (
          <SignUp
            handleUser={() => setNewUser(false)}
            googleSignIn={signInWithGoogle}
          />
        ) : (
          <SignIn
            handleUser={() => setNewUser(true)}
            googleSignIn={signInWithGoogle}
          />
        )}
      </div>
    </div>
  )
}

export default Modal
