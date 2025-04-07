import { UpdatePasswordFormData } from "@/form/userforms/UpdatePasswordForm";
import { getAuthHeaders } from "@/utils/authClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetUserInfo = () => {
    const request = async () => {
        const response = await fetch(`${API_BASE_URL}/api/user/userinfo`, {
            method: "GET",
            headers: {
                ...getAuthHeaders()
            },
            credentials: "include"
        })

        const data = await response.json()

        if (!data) {
            throw new Error("錯誤")
        }

        return data
    }
    const {
        data,
        isLoading,
    } = useQuery({
        queryKey: ["getUserInfo"],
        queryFn: request
    })
    const user = data?.data?.user ?? null

    return { user, isLoading }

}

export const useUpdatePassword = () => {
    const navigate = useNavigate()

    const request = async (formData: UpdatePasswordFormData) => {

        const response = await fetch(`${API_BASE_URL}/api/user/updatepassword`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                ...getAuthHeaders(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        })
        const data = await response.json()

        if (!response.ok) {
            throw new Error("當前密碼錯誤")
        }
        return data
    }

    const {
        mutate: updatePassword,
        isPending
    } = useMutation({
        mutationFn: request,
        onSuccess: async () => {
            alert("成功更改密碼！")
            navigate("/member/main", { replace: true })
        }
    })
    return { updatePassword, isPending }
}

export const useUpdateUserInfo = () => {
    const navigate = useNavigate()
    const request = async (formData: FormData) => {
        const response = await fetch(`${API_BASE_URL}/api/user/userinfo`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                ...getAuthHeaders(),
            },
            body: formData
        })
        const data = await response.json()
        console.log(data)
        if (!response.ok) {
            throw new Error(data.message)
        }
        return data
    }

    const {
        mutate: updateUserInfo,
        isPending
    } = useMutation({
        mutationFn: request,
        onSuccess: () => {
            alert("成功修改會員資訊！")
            navigate("/member/main", { replace: true })
        },
        onError: (error: Error) => {
            console.log("QQ", error)
        }
    })
    return { updateUserInfo, isPending }
}

export const getPurchase = () => {
    const request = async () => {
        const response = await fetch(`${API_BASE_URL}/api/user/purchase`, {
            method: "GET",
            headers: {
                ...getAuthHeaders(),
            },
            credentials: "include",
        })

        if (!response.ok) {
            throw new Error("錯誤")
        }
        return response.json()
    }

    const {
        data,
        isLoading
    } = useQuery({
        queryKey: ["getPurchase"],
        queryFn: request
    })

    const purchases = data?.data?.purchases ?? []

    return { purchases, isLoading }
}

export const getTransaction = () => {
    const request = async () => {
        const response = await fetch(`${API_BASE_URL}/api/user/transaction`, {
            method: "GET",
            headers: {
                ...getAuthHeaders(),
            },
            credentials: "include",
        })

        if (!response.ok) {
            throw new Error("錯誤")
        }
        return response.json()
    }
    const {
        data,
        isLoading
    } = useQuery({
        queryKey: ["getTransaction"],
        queryFn: request
    })

    const transactions = data?.data?.transactions ?? []

    return { transactions, isLoading }
}

export const getPurchaseDetail = (purchaseId?: string) => {
    const request = async () => {
        const response = await fetch(`${API_BASE_URL}/api/user/purchase/${purchaseId}`, {
            method: "GET",
            headers: {
                ...getAuthHeaders(),
            },
            credentials: "include",
        })

        if (!response.ok) {
            throw new Error("錯誤")
        }
        return response.json()
    }
    const {
        data,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["getPurchaseDetail"],
        queryFn: request,
        enabled: !!purchaseId
    })

    const purchase = data?.data?.purchase ?? []

    return { purchase, isLoading, isError }
}