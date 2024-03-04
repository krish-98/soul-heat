import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth)

  return user ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute
