import { UpdatePasswordFormData } from "@/form/userforms/UpdatePasswordForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetPersonalInfo = () => {
    const getPersonalInfoRequset = async () => {

        const response = await fetch(`${API_BASE_URL}/api/user/personalinfo`, {
            method: "GET",
            credentials: "include"
        })

        const data = await response.json()

        if (!data) {
            throw new Error("更改失敗")
        }

        return data
    }
    const {
        data: userInfo,
        isLoading,
    } = useQuery({
        queryKey: ["fetchPersonalInfo"],
        queryFn: getPersonalInfoRequset
    })

    return { userInfo: userInfo?.data || null, isLoading }

}

export const useUpdatePassword = () => {
    const navigate = useNavigate()

    const updatePasswordRequest = async (data: UpdatePasswordFormData) => {

        const response = await fetch(`${API_BASE_URL}/api/user/updatepassword`, {
            method: "PATCH",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
        const body = await response.json()

        if (!response.ok) {
            throw new Error(body.message || "更改失敗")
        }
        return body
    }

    const {
        mutate: updatePassword,
        error
    } = useMutation({
        mutationFn: updatePasswordRequest,
        onSuccess: async () => {
            alert("成功更改密碼！")
            navigate("/member/main", { replace: true })
        },
        onError: (error: Error) => {
            console.log("QQ", error)
        }
    })
    return { updatePassword, error }
}

export const useUpdatePersonalInfo = () => {

    // const navigate = useNavigate()

    const updatePersonalInfoRequest = async (formData: FormData) => {
        const response = await fetch(`${API_BASE_URL}/api/user/personalinfo`, {
            method: "PATCH",
            credentials: "include",
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
        mutate: updatePersonalInfo,
        error
    } = useMutation({
        mutationFn: updatePersonalInfoRequest,
        onSuccess: (data) => {
            alert("成功修改會員資訊！")
            console.log(data)
        },
        onError: (error: Error) => {
            console.log("QQ", error)
        }
    })
    return { updatePersonalInfo, error }
}

export const getPurchaseDetail = () => {
    const request = async () => {
        const response = await fetch(`${API_BASE_URL}/api/user/purchasedetail`, {
            method: "GET",
            credentials: "include",
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error("錯誤")
        }
        return data
    }

    const {
        data: purchaseDetail,
        isLoading
    } = useQuery({
        queryKey: ["getPurchaseDetail"],
        queryFn: request
    })
    return { purchaseDetail: purchaseDetail?.data || [], isLoading }
}
