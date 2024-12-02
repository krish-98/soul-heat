import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

const OnlineStatus = () => {
  useEffect(() => {
    const handleOnline = () => {
      toast.success('You came back online 🙂')
    }

    const handleOffline = () => {
      toast.error('You are offline 😴')
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
