export const authClient = {
    setToken: (token: string) => localStorage.setItem("auth_token", token),
    getToken: () => localStorage.getItem("auth_token"),
    removeToken: () => localStorage.removeItem("auth_token")
}

export const getAuthHeaders = () => {
    const token = localStorage.getItem("auth_token")
    const headers: Record<string, string> = {}
    if (token) {
        headers["Authorization"] = `Bearer ${token}`
    }
    return headers
}