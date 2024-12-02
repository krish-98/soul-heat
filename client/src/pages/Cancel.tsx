import { Link } from 'react-router-dom'
import Failure from '../assets/failure-100.png'

const Cancel = () => {
  return (
    <div className="flex justify-center items-center gap-4 min-h-[calc(100vh-96px)] lg:min-h-[calc(100vh-80px)] bg-[#fb923c] bg-opacity-10">
      <div className="bg-[#f5f3f3] w-[350px] flex flex-col items-center gap-6 py-16 px-5 rounded-xl shadow-2xl shadow-red-200">
        <img src={Failure} alt="Payment failure" />
        <p className="text-2xl text-red-500 border-b-2 pb-4 border-dotted border-b-slate-400 font-medium lg:text-4xl lg:pb-6">
          Payment Failed!
        </p>
        <p className="text-sm text-center font-medium tracking-wide lg:text-base">
          Hey, seems like there was a problem while you were making transaction.
          <br />
          <br />
          Don&apos;t worry, you can go back and try again.😀
        </p>
        <Link
          to="/cart"
          className="bg-red-500 text-white p-2 rounded-lg font-medium lg:px-4 lg:py-2.5 hover:bg-red-400 transition-all duration-500"
        >
          Try Again
        </Link>
      </div>
    </div>
  )
}
export default Cancel
