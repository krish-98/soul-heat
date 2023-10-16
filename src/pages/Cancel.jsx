import Failure from "../assets/failure-100.png"

const Cancel = () => {
  return (
    <div className="bg-[#f5f3f3] min-h-[calc(100vh-96px)] flex flex-col justify-center items-center gap-4 lg:min-h-[calc(100vh-80px)]">
      <img src={Failure} alt="Payment failure" />
      <p className="text-2xl text-red-500 border-b-2 pb-4 border-dashed border-b-slate-600 font-medium lg:text-4xl lg:pb-6">
        Payment Failed!
      </p>
      <a
        href="/"
        className="bg-[#fb923c] text-white p-2 rounded-lg font-medium lg:px-4 lg:py-2.5 hover:bg-orange-300 transition-all"
      >
        Try Again
      </a>
    </div>
  )
}
export default Cancel
