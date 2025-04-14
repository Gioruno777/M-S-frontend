import { ForgotPasswordFormData } from "@/form/authforms/ForgotPasswordForm";
import { LoginFormData } from "@/form/authforms/LoginForm";
import { ResetPasswordFormData } from "@/form/authforms/ResetPasswordForm";
import { SignUpFormData } from "@/form/authforms/SignUpForm";
import { authClient, getAuthHeaders } from "@/utils/authClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSignUp = () => {
    const navigate = useNavigate()

    const request = async (formData: SignUpFormData) => {
        const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || "註冊失敗")
        }
        return data
    }
    const {
        mutate: signUp,
        isPending,
    } = useMutation({
        mutationFn: request,
        onSuccess: async () => {
            alert("註冊成功")
            navigate("/auth/login", { replace: true })
        }
    })
    return { signUp, isPending }
}

export const useLogin = () => {
    const queryClient = useQueryClient()

    const request = async (formData: LoginFormData) => {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || "登入失敗，請檢查帳號或密碼")
        }

        authClient.removeToken()
        if (data.token) {
            authClient.setToken(data.token)
        }

        return data
    }

    const {
        mutate: login,
        isPending,
        isSuccess
    } = useMutation({
        mutationFn: request,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["validateToken"] })
        }
    })

    return { login, isPending, isSuccess }
}

export const useValidateToken = () => {

    const request = async () => {

        const response = await fetch(`${API_BASE_URL}/api/auth/validatetoken`, {
            method: "GET",
            credentials: "include",
            headers: {
                ...getAuthHeaders()
            }
        })

        if (!response.ok) {
            throw new Error("Token invalid");
        }
        return response.json()
    }

    const { isError, isLoading } = useQuery({
        queryKey: ["validateToken"],
        queryFn: request,
        retry: false,
    })

    return { isError, isLoading }
}

export const UseLogout = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const logoutResponse = async () => {
        const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
            method: "POST",
            credentials: "include"
        })

        if (!response.ok) {
            throw new Error("Token invalid");
        }
        return response.json()
    }

    const {
        mutate: logout,
        isPending
    }
        = useMutation({
            mutationFn: logoutResponse,
            onSuccess: async () => {

                authClient.removeToken()

                await queryClient.invalidateQueries({ queryKey: ["validateToken"] })
                alert("登出成功")
                navigate("/", { replace: true })
            },
            onError: () => {
                alert("登出失敗😅")
            }
        })
    return { logout, isPending }
}

export const useForgotPassword = () => {
    const navigate = useNavigate()
    const request = async (formData: ForgotPasswordFormData) => {
        const response = await fetch(`${API_BASE_URL}/api/auth/forgotpassword`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
        const data = await response.json()

        if (!response.ok) {
            throw new Error("伺服器錯誤")
        }
        return data
    }
    const {
        mutate: sendResettoken,
        isPending
    } = useMutation({
        mutationFn: request,
        onSuccess: () => {
            alert("請至信箱收取重設密碼連結！")
            navigate("/", { replace: true })
        }
    })
    return { sendResettoken, isPending }
}

export const useCheckResetToken = (resetToken: string) => {

    const request = async () => {
        if (!resetToken) return null
        const response = await fetch(`${API_BASE_URL}/api/auth/resetpassword/${resetToken}`, {
            method: "GET"
        })
        if (!response.ok) {
            throw new Error("請求逾時");
        }
        const result = await response.json();
        return result
    }
    const {
        isError,
        isLoading
    } = useQuery({
        queryKey: ["checkResetToken"],
        queryFn: request
    })
    return { isError, isLoading }
}

export const useResetPassword = (resetToken: string) => {
    const navigate = useNavigate()

    const request = async (formData: ResetPasswordFormData) => {
        const response = await fetch(`${API_BASE_URL}/api/auth/resetpassword/${resetToken}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
        const data = await response.json()

        if (!response.ok) {
            throw new Error("請求逾時")
        }

        return data
    }
    const {
        mutate: resetPassword,
        isPending
    } = useMutation({
        mutationFn: request,
        onSuccess: () => {
            alert("重設成功")
            navigate("/auth/login", { replace: true })
        },
        onError: () => {
            alert("請求逾時")
            navigate("/", { replace: true })
        }
    })
    return { resetPassword, isPending }
}