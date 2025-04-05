import { useAuthContext } from "@/context/AuthContext"
import { Navigate, useLocation } from "react-router-dom"


type Props = {
    children: React.ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
    const { isLoggedIn } = useAuthContext()
    const location = useLocation()

    if (!isLoggedIn) {
        return <Navigate to="/auth/login" replace state={{ from: location.pathname }} />
    }

    return <>{children}</>
}

export default ProtectedRoute