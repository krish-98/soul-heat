import { useState } from "react"
import logo2 from "../assets/logo2.png"
import { FaHamburger } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import { TfiShoppingCart, TfiShoppingCartFull } from "react-icons/tfi"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Header = () => {
  const [toggle, setToggle] = useState(false)
  const { totalItems } = useSelector((store) => store.cart)

  const handleToggler = () => {
    setToggle(!toggle)
  }

  return (
    <>
      {/* Mobile Navbar */}
      <header className="relative bg-[#f26434] lg:hidden">
        <div className="absolute top-5 left-4">
          {!toggle ? (
            <FaHamburger
              onClick={handleToggler}
              className="w-[30px] h-10 fill-white"
            />
          ) : (
            <>
              <ImCross
                onClick={handleToggler}
                className="w-[30px] h-10 fill-white"
              />
            </>
          )}
        </div>

        <div className="flex item-center justify-between px-3">
          <Link to="/">
            <img className="h-20 object-contain" src={logo2} alt="logo" />
          </Link>

          <Link to="/cart" className="hover:bg-[#f9bca8] self-center relative">
            <TfiShoppingCart className="w-8 h-10 fill-white cursor-pointer" />
            <div className="absolute -right-2 bottom-6 bg-white w-6 h-6 rounded-full">
              <p className="text-center text-[#f26434] font-bold">
                {totalItems}
              </p>
            </div>
          </Link>
        </div>

        {toggle && (
          <ul className="bg-[#f26434] flex flex-col items-center gap-3 tracking-widest uppercase pb-4 text-white">
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
      <header className="hidden lg:flex justify-between items-center bg-[#f26434] pr-12 xl:pr-36">
        <Link to="/">
          <img
            className="h-20 cursor-pointer xl:ml-28"
            src={logo2}
            alt="logo"
          />
        </Link>

        <ul className="flex gap-10 items-center text-white font-medium uppercase tracking-wide">
          <li className="cursor-pointer ">
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer ">
            <Link to="/About">About</Link>
          </li>
          <li className="cursor-pointer ">
            <Link to="/contact">Contact</Link>
          </li>

          <Link to="/cart" className="relative">
            <TfiShoppingCart className="w-8 h-10 fill-white cursor-pointer" />
            {/* <TfiShoppingCartFull className="w-6 h-6 fill-white cursor-pointer" /> */}
            <div className="absolute -right-2 bottom-6 bg-white w-6 h-6 rounded-full">
              <p className="text-center text-[#f26434] font-bold">
                {totalItems}
              </p>
            </div>
          </Link>
        </ul>
      </header>
    </>
  )
}
export default Header
