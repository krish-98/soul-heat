import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

const OnlineStatus = () => {
  useEffect(() => {
    const handleOnline = () => {
      toast.success('You came back online 🙂', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    }

    const handleOffline = () => {
      toast.error('You are offline 😴', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return <></>
}
export default OnlineStatus
