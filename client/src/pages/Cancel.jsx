import Failure from '../assets/failure-100.png'

const Cancel = () => {
  return (
    <div className="flex justify-center items-center gap-4 min-h-[calc(100vh-96px)] lg:min-h-[calc(100vh-80px)] bg-[#fb923c] bg-opacity-20">
      <div className="bg-[#f5f3f3] w-[350px] flex flex-col items-center gap-6 py-16 px-5 rounded-lg shadow-2xl">
        <img src={Failure} alt="Payment failure" />
        <p className="text-2xl text-red-500 border-b-2 pb-4 border-dashed border-b-slate-600 font-medium lg:text-4xl lg:pb-6">
          Payment Failed!
        </p>
        <p className="text-center text-sm font-medium tracking-wide lg:text-base">
          Hey, seems like there was a problem while you were making transaction.
          <br />
          <br />
          Don&apos;t worry 🙂, you can go back and try again.
        </p>
        <a
          href="/cart"
          className="bg-[#fb923c] text-white p-2 rounded-lg font-medium lg:px-4 lg:py-2.5 hover:bg-orange-300 transition-all"
        >
          Try Again
        </a>
      </div>
    </div>
  )
}
export default Cancel
