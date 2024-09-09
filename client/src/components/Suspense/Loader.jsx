import { BounceLoader } from 'react-spinners'

export default function Loader() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f5f3f3] bg-opacity-50">
      <BounceLoader color="#ffae3c" />
    </div>
  )
}
