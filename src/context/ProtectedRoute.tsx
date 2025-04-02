import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthContext } from "./AuthConext"

const ProtectedRoute = () => {
    const { isLoggedIn } = useAuthContext()
    const location = useLocation()

    return isLoggedIn ? (
        <Outlet />
    ) : (
        <Navigate to="/auth/login" state={{ from: location }} replace />
    )
}

export default ProtectedRoute