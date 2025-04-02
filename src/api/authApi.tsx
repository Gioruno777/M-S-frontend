import { ForgotPasswordFormData } from "@/form/authforms/ForgotPasswordForm";
import { ResetPasswordFormData } from "@/form/authforms/ResetPasswordForm";
import { SignUpFormData } from "@/form/authforms/SignUpForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCheckEmail = (email: string) => {

    const checkEmailRequset = async () => {
        if (!email) return null
        const response = await fetch(`${API_BASE_URL}/api/auth/checkemail/${email}`, {
            method: "GET"
        })
        if (!response.ok) {
            throw new Error("Something Error");
        }
        const result = await response.json();
        return result.exists ?? null;
    }
    const {
        data,
        isLoading,
        refetch
    } = useQuery({
        queryKey: ["checkEmail"],
        queryFn: checkEmailRequset,
        enabled: false,
        retry: false,
    })
    return { exists: data ?? null, isLoading, refetch }
}


export const useSignUp = () => {
    const navigate = useNavigate()

    const signUpRequset = async (data: SignUpFormData) => {
        const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
        const body = await response.json()

        if (!response.ok) {
            throw new Error("註冊失敗")
        }
        return body
    }
    const mutation = useMutation({
        mutationFn: signUpRequset,
        onSuccess: async (data) => {
            navigate("/auth/login", { replace: true })
            console.log("成功登入:", data)
        },
        onError: (error: Error) => {
            console.log("QQ", error)
        }
    })
    return mutation
}


type loginType = {
    email: string
    password: string
}

export const useLogin = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const loginRequset = async (data: loginType) => {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })

        const body = await response.json()

        if (!response.ok) {
            throw new Error("登入失敗，請檢查帳號或密碼")
        }

        return body
    }

    const mutation = useMutation({
        mutationFn: loginRequset,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["validateToken"] })
            navigate("/member/main", { replace: true })
            console.log("成功登入:", data)
        },
        onError: (error: Error) => {
            console.log("QQ", error)
        },
    })

    return mutation
}

export const useValidateToken = () => {

    const getTokenRequset = async () => {
        const response = await fetch(`${API_BASE_URL}/api/auth/validatetoken`, {
            method: "GET",
            credentials: "include"
        })

        if (!response.ok) {
            throw new Error("Token invalid");
        }
        return response.json()
    }

    const { isError, isLoading } = useQuery({
        queryKey: ["validateToken"],
        queryFn: getTokenRequset,
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

    const mutation = useMutation({
        mutationFn: logoutResponse,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["validateToken"] })
            navigate("/", { replace: true })
            console.log("成功登出:", data)
        },
        onError: (error: Error) => {
            console.log("QQ", error)
        }
    })
    return mutation
}

export const useForgotPassword = () => {
    const navigate = useNavigate()

    const forgotPasswordRequset = async (data: ForgotPasswordFormData) => {
        const response = await fetch(`${API_BASE_URL}/api/auth/forgotpassword`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
        const body = await response.json()

        if (!response.ok) {
            throw new Error("註冊失敗")
        }
        return body
    }
    const mutation = useMutation({
        mutationFn: forgotPasswordRequset,
        onSuccess: async (data) => {
            navigate("/", { replace: true })
            console.log("成功登入:", data)
        },
        onError: (error: Error) => {
            console.log("QQ", error)
        }
    })
    return mutation
}

export const useCheckResetToken = (resetToken: string) => {

    const checkResetTokenRequset = async () => {
        if (!resetToken) return null
        const response = await fetch(`${API_BASE_URL}/api/auth//resetpassword/${resetToken}`, {
            method: "GET"
        })
        if (!response.ok) {
            throw new Error("Something Error");
        }
        const result = await response.json();
        return result
    }
    const {
        data,
        isError,
        isLoading
    } = useQuery({
        queryKey: ["checkResetToken"],
        queryFn: checkResetTokenRequset,
    })
    return { data, isError, isLoading }
}

export const useResetPassword = (resetToken: string) => {
    const navigate = useNavigate()

    const resetPasswordRequset = async (data: ResetPasswordFormData) => {
        const response = await fetch(`${API_BASE_URL}/api/auth/resetpassword/${resetToken}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
        const body = await response.json()

        if (!response.ok) {
            throw new Error("更改失敗")
        }
        console.log(body)
        return body
    }
    const mutation = useMutation({
        mutationFn: resetPasswordRequset,
        onSuccess: async (data) => {
            navigate("/", { replace: true })
            console.log("成功更改密碼:", data)
        },
        onError: (error: Error) => {
            console.log("QQ", error)
        }
    })
    return mutation
}