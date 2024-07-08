import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className="bg-gray-950 py-12">
      <div className="text-gray-500 flex flex-col items-center gap-4 mx-auto max-w-7xl lg:flex-row lg:items-start">
        <div className="w-96 text-center">
          <h3 className="md:text-xl text-slate-300 font-semibold ">
            Soul Heat
          </h3>
          <p className="text-gray-500text-sm md:text-base">
            &copy; 2024 Soul Heat Pvt.Ltd
          </p>
        </div>

        <div className="space-y-2 w-96 text-center">
          <h3 className="text-lg lg:text-xl text-slate-300 font-semibold">
            Company
          </h3>
          <div className="flex flex-col items-center text-sm md:text-base">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="#">Career</Link>
          </div>
        </div>

        <div className="space-y-2 w-96 text-center">
          <h3 className="text-lg lg:text-xl text-slate-300 font-semibold">
            Legal
          </h3>
          <div className="flex flex-col items-center text-sm md:text-base">
            <Link to="#">Terms & Conditions</Link>
            <Link to="#">Cookie Policy</Link>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Investor Relations</Link>
          </div>
        </div>

        <div className="space-y-2 w-96 text-center">
          <h3 className="text-lg lg:text-xl text-slate-300 font-semibold">
            We Delivery to
          </h3>
          <div className="flex flex-col items-center text-sm md:text-base">
            <Link to="#">Chennai</Link>
            <Link to="#">Bangalore</Link>
            <Link to="#">Hyderbad</Link>
            <Link to="#">Mumbai</Link>
            <Link to="#">Delhi</Link>
            <p>100+ cities</p>
          </div>
        </div>
      </div>
    </div>
  )
}
