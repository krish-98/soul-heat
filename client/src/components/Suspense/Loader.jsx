import { RingLoader } from 'react-spinners'

export default function Loader() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <RingLoader color="#fb923c" />
    </div>
  )
}
