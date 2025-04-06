import { useAuthContext } from "@/context/AuthContext"
import { Navigate } from "react-router-dom"


type Props = {
    children: React.ReactNode
    afterLoginPath: string
}

const ProtectedRoute = ({ children, afterLoginPath }: Props) => {
    const { isLoggedIn } = useAuthContext()


    if (!isLoggedIn) {
        return <Navigate to="/auth/login" replace state={{ from: afterLoginPath }} />
    }

    return <>{children}</>
}

export default ProtectedRoute