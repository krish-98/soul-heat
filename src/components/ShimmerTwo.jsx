const ShimmerTwo = () => {
  return (
    <div className="w-full pt-6">
      <div className="space-y-3 pb-4 border-b">
        <h1 className="w-64 h-14 md:w-96 bg-gray-200 animate-pulse"></h1>
        <p className="w-24 h-4 md:w-44 bg-gray-200 animate-pulse"></p>
        <p className="w-24 h-4 md:w-44 bg-gray-200 animate-pulse"></p>
      </div>

      <div className="mt-12">
        <div className="">
          <h2 className="w-52 h-8 md:w-80 bg-gray-200 animate-pulse"></h2>
        </div>

        {Array(15)
          .fill("")
          .map((e, index) => (
            <div key={index} className="my-8 space-y-4 flex justify-between">
              <div className="space-y-2">
                <h3 className="w-36 h-4 md:w-60 bg-gray-200 animate-pulse"></h3>
                <p className="w-24 h-4 md:w-40 bg-gray-200 animate-pulse"></p>
                <p className="w-24 h-4 md:w-40 bg-gray-200 animate-pulse"></p>
              </div>

              <div className="relative">
                <p className="w-20 md:w-40 h-14 md:h-24 bg-gray-200 animate-pulse" />

                <button className="absolute bottom-2 -left-2 w-24 md:w-44 md:h-6 h-4 bg-gray-200 animate-pulse"></button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ShimmerTwo
