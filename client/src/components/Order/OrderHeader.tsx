import { PiNotepadLight } from 'react-icons/pi'

export default function OrderHeader() {
  return (
    <div className="flex items-center gap-3 bg-white py-6 rounded-lg px-8">
      <div className="bg-[#ffedd5] p-2 rounded-lg">
        <PiNotepadLight className="w-9 h-9 fill-shOrange2" />
      </div>
      <div>
        <h3 className="text-2xl lg:text-[1] font-bold tracking-tight">
          Orders Dashboard
        </h3>
        <p className="text-sm lg:text-base text-gray-500">
          Track and manage all your orders effciently
        </p>
      </div>
    </div>
  )
}
