import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/logo.png'
import { VscChromeClose } from 'react-icons/vsc'
import { IoCallOutline, IoCartOutline } from 'react-icons/io5'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { PiHamburgerFill } from 'react-icons/pi'
import { AiOutlineHome } from 'react-icons/ai'
import { FaRegBuilding } from 'react-icons/fa'
import { logout } from '../features/authSlice'
import { calculateCartTotal, clearCart, getCart } from '../features/cartSlice'

const MobileHeader = ({
  toggle,
  handleToggler,
  totalItems,
  user,
  showSignout,
  setShowSignout,
  handleModal,
  handleSignOutUser,
}) => {
  return (
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
          {/* Cart icon */}
          <Link to="/cart" className="hover:bg-[#f9bca8] relative">
            <IoCartOutline className="w-8 h-8 stroke-white cursor-pointer" />

            <div className="absolute -right-1 bottom-5 bg-white w-6 h-6 rounded-full">
              <p className="text-center text-[#fb923c] font-bold text-sm pt-0.5">
                {totalItems}
              </p>
            </div>
          </Link>

          {/* Displaying user Profile pic */}
          {!user?._id ? (
            <Link to={'/sign-in'}>
              <HiOutlineUserCircle className="w-8 h-9 stroke-white cursor-pointer" />
            </Link>
          ) : (
            <div className="relative cursor-pointer">
              <img
                onClick={() => {
                  setShowSignout(!showSignout)
                }}
                className="w-14 md:w-12 object-contain border rounded-full ring-1 ring-white ring-offset-2"
                src={user?.avatar}
                alt="user profile"
                referrerPolicy="no-referrer"
              />

              {showSignout && (
                <>
                  <div
                    className="fixed inset-0 h-full w-full z-50"
                    onClick={handleModal}
                  />
                  <div className="absolute top-10 xs:top-14 md:top-16 right-0 z-50 bg-white p-3 text-sm rounded-md w-24 space-y-2">
                    <Link onClick={handleModal} to="/my-orders">
                      My orders
                    </Link>
                    <hr />
                    <button onClick={handleSignOutUser}>Logout</button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Dropdown Menu List  */}
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
  )
}

const Header = () => {
  const [toggle, setToggle] = useState(false)
  const [showSignout, setShowSignout] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { totalItems, cartItems } = useSelector((store) => store.cart)
  const { user } = useSelector((store) => store.auth)

  useEffect(() => {
    const getAllCartItems = async () => {
      try {
        if (user !== null) {
          const res = await fetch('/api/cart/all-items')
          const data = await res.json()

          if (data.success === false) return

          dispatch(getCart(data))
          dispatch(calculateCartTotal())
        }
      } catch (error) {
        console.log(error)
      }
    }

    // cartItems.length > 0 && getAllCartItems()
    getAllCartItems()
  }, [user, cartItems.length, dispatch, totalItems])

  const handleToggler = () => {
    setToggle(!toggle)
  }

  const handleModal = () => {
    setShowSignout(false)
  }

  const handleSignOutUser = async () => {
    try {
      const res = await fetch('/api/user/signout')
      const data = await res.json()

      if (data.success === false) return

      dispatch(logout())
      dispatch(clearCart())
      setShowSignout(false)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <MobileHeader
        toggle={toggle}
        handleToggler={handleToggler}
        totalItems={totalItems}
        user={user}
        showSignout={showSignout}
        setShowSignout={setShowSignout}
        handleModal={handleModal}
        handleSignOutUser={handleSignOutUser}
      />

      {/* Desktop Navbar */}
      <header className="bg-[#fb923c]">
        <div className="hidden lg:flex items-center max-w-7xl mx-auto pr-12">
          <Link to="/" className="cursor-pointer">
            <img className="h-20 object-cover" src={logo} alt="logo" />
          </Link>

          <ul className="flex w-full items-center justify-between text-white font-semibold tracking-wider">
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

                  <div className="absolute -right-2 bottom-6 bg-white w-6 h-6 rounded-full">
                    <p className="text-center text-[#fb923c] font-bold text-sm pt-0.5">
                      {totalItems}
                    </p>
                  </div>
                </Link>
              </li>

              {/* User Profile Icon */}
              {!user?._id ? (
                <Link
                  to="/sign-in"
                  className="flex items-center cursor-pointer"
                >
                  <li>
                    <HiOutlineUserCircle className="w-9 h-10 stroke-white" />
                  </li>
                  <p className="pl-0.5">Sign In</p>
                </Link>
              ) : (
                <div
                  onClick={() => setShowSignout(!showSignout)}
                  className="rounded-full ring ring-white cursor-pointer relative"
                >
                  <img
                    className="w-11 h-11 object-contain rounded-full"
                    src={user?.avatar}
                    alt="user profile"
                    referrerPolicy="no-referrer"
                  />

                  {showSignout && (
                    <>
                      <div
                        className="fixed inset-0 h-full w-full z-50"
                        onClick={handleModal}
                      />
                      <div className="absolute top-[3.70rem] -right-8 z-50  bg-white text-black px-4 py-2 tracking-wide rounded-md w-32 border border-slate-100 space-y-2">
                        <Link to="/my-orders" onClick={handleModal}>
                          My orders
                        </Link>
                        <hr />
                        <button onClick={handleSignOutUser}>Logout</button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </ul>
        </div>
      </header>
    </>
  )
}

export default Header
