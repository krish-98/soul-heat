import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from './Modal'
import OnlineStatus from './OnlineStatus'

import logo from '../assets/logo.png'
import { VscChromeClose } from 'react-icons/vsc'
import { IoCallOutline, IoCartOutline } from 'react-icons/io5'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { PiHamburgerFill } from 'react-icons/pi'

import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/authSlice'

import { signOut } from 'firebase/auth'
import { auth } from '../configs/firebase.config'
import { AiOutlineHome } from 'react-icons/ai'
import { FaRegBuilding } from 'react-icons/fa'

const Header = () => {
  const dispatch = useDispatch()
  const [toggle, setToggle] = useState(false)
  const [modal, setModal] = useState(false)
  const [showSignout, setShowSignout] = useState(false)

  const { totalItems } = useSelector((store) => store.cart)
  const { user } = useSelector((store) => store.auth)

  const handleToggler = () => {
    setToggle(!toggle)
  }

  const showAndCloseModal = () => {
    setModal(!modal)
  }

  const signOutUser = async () => {
    try {
      await signOut(auth)

      dispatch(logout())
      setShowSignout(false)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
      {/* Mobile Navbar */}
      <header className="relative bg-[#fb923c] px-3.5 py-2 lg:hidden">
        <div className="flex item-center justify-between">
          {/* Dropdown Togglers */}
          <div className="flex items-center cursor-pointer">
            {!toggle ? (
              <PiHamburgerFill
                onClick={handleToggler}
                className="w-[30px] h-8 stroke-white fill-white"
              />
            ) : (
              <VscChromeClose
                onClick={handleToggler}
                className="w-[30px] h-8 stroke-white fill-white cursor-pointer"
              />
            )}
          </div>

          <Link to="/">
            <img className="h-20 object-contain" src={logo} alt="logo" />
          </Link>

          <div className="flex items-center gap-5">
            <Link to="/cart" className="hover:bg-[#f9bca8] relative">
              <IoCartOutline className="w-8 h-8 stroke-white cursor-pointer" />

              <div className="absolute -right-1 bottom-5  bg-white w-5 h-5 rounded-full">
                <p className="text-center text-[#FB3C46] font-bold text-sm">
                  {totalItems}
                </p>
              </div>
            </Link>

            {/* Displaying user Profile pic */}
            {user ? (
              user?.photoURL === null ? (
                <div onClick={() => setShowSignout(true)} className="relative">
                  <p className="w-10 truncate rounded-full p-1.5 ring-white ring-2 text-white">
                    {user?.email}
                  </p>

                  {showSignout && (
                    <button
                      onClick={signOutUser}
                      className="absolute top-12 right-0 z-50 bg-white p-2 text-sm rounded-md"
                    >
                      Logout
                    </button>
                  )}
                </div>
              ) : (
                <div className="relative cursor-pointer">
                  <img
                    onClick={() => {
                      setShowSignout(!showSignout)
                    }}
                    className="w-14 md:w-12 object-contain border rounded-full ring-1 ring-white ring-offset-2"
                    src={user?.photoURL}
                    alt="user profile"
                    referrerPolicy="no-referrer"
                  />

                  {showSignout && (
                    <button
                      onClick={signOutUser}
                      className="absolute top-12 xs:top-16 right-0 z-50 bg-white p-2 text-sm rounded-md"
                    >
                      Logout
                    </button>
                  )}
                </div>
              )
            ) : (
              ''
            )}

            {!user && (
              <HiOutlineUserCircle
                onClick={() => setModal(true)}
                className="w-8 h-9 stroke-white cursor-pointer"
              />
            )}
          </div>
        </div>

        {/* Dropdown Menu List */}
        {toggle && (
          <ul className="bg-[#fb923c] flex flex-col items-center gap-3 tracking-widest uppercase pb-4 text-white">
            <li
              onClick={handleToggler}
              className="hover:bg-[#f9bca8] w-full text-center py-2"
            >
              <Link to="/" className="flex items-center justify-center gap-2">
                <AiOutlineHome className="w-6 h-8 stroke-white fill-white cursor-pointer inline" />
                <p>Home</p>
              </Link>
            </li>

            <li
              onClick={handleToggler}
              className="hover:bg-[#f9bca8] w-full text-center py-2"
            >
              <Link
                to="/about"
                className="flex items-center justify-center gap-2"
              >
                <FaRegBuilding className="w-6 h-8 stroke-white fill-white cursor-pointer inline" />
                <p>About</p>
              </Link>
            </li>

            <li
              onClick={handleToggler}
              className="hover:bg-[#f9bca8] w-full text-center py-2"
            >
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2"
              >
                <IoCallOutline className="w-6 h-8 stroke-white fill-white cursor-pointer inline" />
                <p>Contact</p>
              </Link>
            </li>
          </ul>
        )}
      </header>

      {/* Desktop Navbar */}
      <header className="bg-[#fb923c]">
        <div className="hidden lg:flex items-center max-w-[1280px] mx-auto pr-12">
          <Link to="/" className="cursor-pointer">
            <img className="h-20 object-cover" src={logo} alt="logo" />
          </Link>

          <ul className="flex w-full items-center justify-between text-white font-semibold uppercase tracking-wider">
            <div className="flex items-center gap-10 ml-20 xl:ml-44">
              <li onClick={handleToggler}>
                <Link to="/" className="flex items-center justify-center gap-2">
                  <AiOutlineHome className="w-6 h-8 stroke-white fill-white cursor-pointer inline" />
                  <p>Home</p>
                </Link>
              </li>

              <li onClick={handleToggler}>
                <Link
                  to="/about"
                  className="flex items-center justify-center gap-2"
                >
                  <FaRegBuilding className="w-6 h-8 stroke-white fill-white cursor-pointer inline" />
                  <p>About</p>
                </Link>
              </li>

              <li onClick={handleToggler}>
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2"
                >
                  <IoCallOutline className="w-6 h-8 stroke-white fill-white cursor-pointer inline" />
                  <p>Contact</p>
                </Link>
              </li>
            </div>

            <div className="flex items-center gap-10">
              {/* Cart */}
              <li className="cursor-pointer">
                <Link to="/cart" className="relative">
                  <IoCartOutline className="w-8 h-10 stroke-white cursor-pointer" />

                  <div className="absolute -right-2 bottom-6 bg-white w-5 h-5 rounded-full">
                    <p className="text-center text-[#fb923c] font-bold text-sm">
                      {totalItems}
                    </p>
                  </div>
                </Link>
              </li>

              {/* User Profile Icon */}
              {!user && (
                <div
                  onClick={() => setModal(true)}
                  className="flex items-center cursor-pointer"
                >
                  <li>
                    <HiOutlineUserCircle className="w-9 h-10 stroke-white" />
                  </li>
                  <p className="pl-0.5">Login</p>
                </div>
              )}

              {user && user?.photoURL && (
                <div
                  onClick={() => setShowSignout(!showSignout)}
                  className="rounded-full ring ring-white cursor-pointer relative"
                >
                  <img
                    className="w-11 h-11 object-contain rounded-full"
                    src={user?.photoURL}
                    alt="user profile"
                    referrerPolicy="no-referrer"
                  />

                  {showSignout && (
                    <button
                      onClick={signOutUser}
                      className="absolute top-14 -right-4 w-20 bg-white text-black z-50 p-2 tracking-wide rounded-md"
                    >
                      Logout
                    </button>
                  )}
                </div>
              )}

              {user && !user?.photoURL && (
                <div className="relative rounded-full ring ring-white cursor-pointer">
                  <p
                    onClick={() => setShowSignout(!showSignout)}
                    className="lowercase p-2 w-10 h-10 truncate"
                  >
                    {user?.email}
                  </p>

                  {showSignout && (
                    <button
                      onClick={signOutUser}
                      className="absolute top-14 -right-4 w-20 bg-white text-black z-50 p-2 tracking-wide rounded-md"
                    >
                      Logout
                    </button>
                  )}
                </div>
              )}
            </div>
          </ul>
        </div>
      </header>

      {modal && <Modal showAndCloseModal={showAndCloseModal} />}

      <OnlineStatus />
    </>
  )
}

export default Header