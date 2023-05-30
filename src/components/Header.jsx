import { useState } from "react"
import logo2 from "../assets/logo2.png"
import { FaHamburger } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import { RiShoppingCart2Fill } from "react-icons/ri"
import { Link } from "react-router-dom"

const Header = () => {
  const [toggle, setToggle] = useState(false)

  const handleToggler = () => {
    setToggle(!toggle)
  }

  return (
    <>
      {/* Mobile Navbar */}
      <header className="relative bg-[#f26434] lg:hidden">
        <Link to="/">
          <img className="h-20 object-contain " src={logo2} alt="logo" />
        </Link>
        <div className="absolute top-3 right-4">
          {!toggle ? (
            <FaHamburger
              onClick={handleToggler}
              className="w-8 h-12 fill-white"
            />
          ) : (
            <>
              <ImCross
                onClick={handleToggler}
                className="w-8 h-12 fill-white"
              />
            </>
          )}
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
            <li
              onClick={handleToggler}
              className="hover:bg-[#f9bca8] w-full text-center py-2"
            >
              Cart
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

        <ul className="flex gap-10 text-white font-medium uppercase tracking-wide">
          <li className="cursor-pointer ">
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer ">
            <Link to="/About">About</Link>
          </li>
          <li className="cursor-pointer ">
            <Link to="/contact">Contact</Link>
          </li>

          <RiShoppingCart2Fill className="w-6 h-6 fill-white cursor-pointer" />
        </ul>
      </header>
    </>
  )
}
export default Header
