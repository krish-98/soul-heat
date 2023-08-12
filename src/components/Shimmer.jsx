const Shimmer = () => {
  return (
    <div
      className="flex flex-wrap justify-center items-center mt-14 gap-10"
      data-testid="shimmer"
    >
      {Array(20)
        .fill("")
        .map((e, index) => (
          <div
            key={index}
            className="w-72 h-[340px] rounded-b-3xl border border-[#ebebeb]  p-4 group hover:shadow-lg transition-all duration-500 delay-100 cursor-pointer space-y-4"
          >
            <h1 className="w-[254px] h-[160px] animate-pulse bg-gray-400 object-contain rounded-b-3xl group-hover:scale-105 transition-all duration-500 delay-100" />
            <h2 className="w-[170px] h-[20px] animate-pulse bg-gray-400"></h2>
            <h3 className="w-[150px] h-[20px] animate-pulse bg-gray-400"></h3>
            <div className="flex justify-between items-center">
              <h3 className="w-[50px] h-[20px] animate-pulse bg-gray-400"></h3>
              <h3 className="w-[60px] h-[20px] animate-pulse bg-gray-400"></h3>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Shimmer
