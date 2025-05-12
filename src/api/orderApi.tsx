import { deleteCartItemData } from "@/components/CartCard"
import { AddToCartFormData } from "@/form/orderforms/AddToCartForm"
import { CheckOutFormData } from "@/form/orderforms/CheckOutForm"
import { TopUpFormData } from "@/form/orderforms/TopUpform"
import { UpdateItemQtyFormData } from "@/form/orderforms/UpdateItemQtyForm"
import { getAuthHeaders } from "@/utils/authClient"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useTopUp = () => {

    const request = async (formData: TopUpFormData) => {
        const response = await fetch(`${API_BASE_URL}/api/order/topup`, {
            method: "POST",
            headers: {
                ...getAuthHeaders(),
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(formData)
        })
        const data = await response.json()

        if (!response.ok)
            throw new Error()

        return data
    }

    const {
        mutate: topUp,
        isPending
    } = useMutation({
        mutationFn: request,
        onSuccess: async (data) => {
            if (data?.url) {
                window.location.href = data.url
            } else {
                console.error("沒有取得 Stripe URL")
            }
        }
    })

    return { topUp, isPending }

}

export const useAddToCart = () => {
    const request = async (formData: AddToCartFormData) => {
        const response = await fetch(`${API_BASE_URL}/api/order/addtocart`, {
            method: "POST",
            headers: {
                ...getAuthHeaders(),
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(formData)
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error()
        }

        return data
    }

    const {
        mutate: addToCart,
        isPending
    } = useMutation({
        mutationFn: request,
        onSuccess: async () => {
            alert("加入購物車成功！")
            window.location.reload()
        }
    })
    return { addToCart, isPending }
}

export const useGetCartItem = () => {

    const request = async () => {
        const response = await fetch(`${API_BASE_URL}/api/order/cartitem`, {
            method: "GET",
            headers: { ...getAuthHeaders() },
            credentials: "include"
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error()
        }

        return data
    }
    const {
        data,
        isLoading,
    } = useQuery({
        queryKey: ["getCartItem"],
        queryFn: request
    })
    const items = data?.data?.items ?? []
    return { items, isLoading }
}

export const useUpdateCartItemQty = () => {
    const queryClient = useQueryClient()
    const request = async (body: UpdateItemQtyFormData) => {
        const response = await fetch(`${API_BASE_URL}/api/order/cartitem`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                ...getAuthHeaders(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            throw new Error()
        }
        return response.json()
    }

    const {
        mutate: updateCartItemQty,
        isPending
    } = useMutation({
        mutationFn: request,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["getCartItem"] })
        }
    })

    return { updateCartItemQty, isPending }
}


export const useDeleteCartItem = () => {
    const request = async (formData: deleteCartItemData) => {
        const response = await fetch(`${API_BASE_URL}/api/order/cartitem`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                ...getAuthHeaders(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        if (!response.ok) {
            throw new Error()
        }

        return response.json()
    }

    const {
        mutate: deleteCartItem,
        isPending
    } = useMutation({
        mutationFn: request,
        onSuccess: () => {
            alert("已移除商品！")
            window.location.reload()
        }
    })

    return { deleteCartItem, isPending }
}

export const useCheckOut = () => {

    const navigate = useNavigate()

    const request = async (formData: CheckOutFormData) => {
        const response = await fetch(`${API_BASE_URL}/api/order/checkout`, {
            method: "POST",
            credentials: "include",
            headers: {
                ...getAuthHeaders(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message)
        }

        return data
    }

    const {
        mutate: checkOut,
        isPending
    } = useMutation({
        mutationFn: request,
        onSuccess: async (data) => {
            if (data?.url) {
                window.location.href = data.url
            }
            else {
                alert("付款成功")
                navigate(`/member/purchase/${data.transaction}`, { replace: true })
            }
        },
        onError: (error) => {
            console.log(error)
            if (error.message.includes("庫存不足")) {
                alert(error.message)
                navigate(`/menu/main`, { replace: true })
            }
        }
    })

    return { checkOut, isPending }
}

export const useGetLatestnote = () => {
    const request = async () => {
        const response = await fetch(`${API_BASE_URL}/api/order/latestnote`, {
            method: "GET",
            credentials: "include",
            headers: {
                ...getAuthHeaders(),
                "Content-Type": "application/json"
            },
        })

        if (!response.ok) {
            throw new Error("付款失敗")
        }

        return response.json()
    }

    const {
        data,
        isLoading
    } = useQuery({
        queryKey: ["getLatestNote"],
        queryFn: request
    })
    const note = data?.data?.note ?? null
    return { note, isLoading }
}