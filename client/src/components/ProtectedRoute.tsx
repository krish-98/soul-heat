import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'

const ProtectedRoute = () => {
  const { user } = useAppSelector((state) => state.auth)

  return user ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute
