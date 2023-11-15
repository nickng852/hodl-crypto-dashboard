import { Navigate, Outlet } from 'react-router-dom'

import useAuth from '../features/auth/useAuth'

const PrivateRoute = () => {
    const { currentUser } = useAuth()

    return currentUser ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute
