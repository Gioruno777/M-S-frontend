import { useValidateToken } from "@/api/authApi";
import React, { useContext } from "react";

type authContextType = {
    isLoggedIn: boolean
}

const AuthContext = React.createContext<authContextType | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { isError, isLoading } = useValidateToken()
    const isLoggedIn = !isError && !isLoading;

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn
            }}>
            {isLoading ? <div>Loading...</div> : children}
        </AuthContext.Provider >
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context as authContextType
};

export default AuthContextProvider