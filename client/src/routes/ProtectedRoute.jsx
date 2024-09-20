/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useCheckAuth } from '../zustand/useCheckAuth'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  const {hasCheckedAuth, isAuthenticated, checkAuth, isLoading} = useCheckAuth()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isLoading || !hasCheckedAuth) return <div>Loading ...</div>

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className='w-full h-full'>{children}</div>
  )
}

export default ProtectedRoute
