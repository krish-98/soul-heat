import Burger from '../assets/404.png'

const ErrorPage = () => {
  return (
    <div className="bg-[#fb923c] min-h-screen flex justify-center items-center gap-4 ">
      <div className="flex flex-col items-center">
        <div className="flex items-center">
          <p className="text-white text-9xl">4</p>
          <img
            className="h-[200px] lg:h-[500px]"
            src={Burger}
            alt="404 image"
          />
          <p className="text-white text-9xl">4</p>
        </div>
        <a
          href="/"
          className="mt-8 text-[#fb923c] bg-white p-2.5 rounded-lg font-medium lg:px-8 lg:py-4 hover:bg-black transition-all"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}

export default ErrorPage
