import { useState } from "react"
import { Link } from "react-router-dom"
import logo3 from "../assets/logo3.png"
import { CgMenuHotdog, CgClose } from "react-icons/cg"
import { MdOutlineRestaurantMenu } from "react-icons/md"
import { IoCartOutline } from "react-icons/io5"
import { HiOutlineUserCircle } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"

import Modal from "./Modal"
import { logout } from "../features/authSlice"
import { signOut } from "firebase/auth"
import { auth } from "../configs/firebase.config"

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
      const userInfo = await signOut(auth)

      dispatch(logout())
      setShowSignout(false)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
      {/* Mobile Navbar */}
      <header className="relative bg-[#fb923c] px-3 py-2 lg:hidden">
        <div className="flex item-center justify-between">
          <div className="absolute top-8 left-4">
            {!toggle ? (
              <CgMenuHotdog
                onClick={handleToggler}
                className="w-[30px] h-8 stroke-white fill-white cursor-pointer"
              />
            ) : (
              <>
                <CgClose
                  onClick={handleToggler}
                  className="w-[30px] h-8 stroke-white fill-white cursor-pointer"
                />
              </>
            )}
          </div>

          <Link to="/">
            <img className="h-20 object-contain" src={logo3} alt="logo" />
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
              user?.providerData?.[0]?.photoURL === null ? (
                <div onClick={() => setShowSignout(true)} className="relative">
                  <p className="w-10 truncate rounded-full p-1.5 ring-1 ring-red-500 text-white">
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
              ""
            )}

            {!user && (
              <HiOutlineUserCircle
                onClick={() => setModal(true)}
                className="w-8 h-9 stroke-white cursor-pointer"
              />
            )}
          </div>
        </div>

        {/* Dropdown Menu */}
        {toggle && (
          <ul className="bg-[#fb923c] flex flex-col items-center gap-3 tracking-widest uppercase pb-4 text-white">
            <li
              onClick={handleToggler}
              className="hover:bg-[#f9bca8] w-full text-center py-2"
            >
              <Link to="/">Home</Link>
            </li>
            <li
              onClick={handleToggler}
              className="hover:bg-[#f9bca8] w-full text-center py-2"
            >
              <Link to="/about">About</Link>
            </li>
            <li
              onClick={handleToggler}
              className="hover:bg-[#f9bca8] w-full text-center py-2"
            >
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        )}
      </header>

      {/* Desktop Navbar */}
      <header className="hidden lg:flex justify-between items-center bg-[#fb923c] pr-12 xl:pr-36">
        <Link to="/">
          <img
            className="h-20 cursor-pointer xl:ml-28"
            src={logo3}
            alt="logo"
          />
        </Link>

        <ul className="flex gap-10 items-center text-white font-semibold uppercase tracking-wider">
          <li className="cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/About">About</Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/contact">Contact</Link>
          </li>
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

          {!user && (
            <li onClick={() => setModal(true)} className="cursor-pointer">
              <HiOutlineUserCircle className="w-9 h-10 stroke-white" />
            </li>
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
          {/* {modal && <Modal showAndCloseModal={showAndCloseModal} />} */}
        </ul>
      </header>

      {modal && <Modal showAndCloseModal={showAndCloseModal} />}
    </>
  )
}
export default Header
