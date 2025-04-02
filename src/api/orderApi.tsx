import { deleteCartItemData } from "@/components/CartCard"
import { AddToCartFormData } from "@/form/orderforms/AddToCartForm"
import { CheckOutFormData } from "@/form/orderforms/CheckOutForm"
import { TopUpFormData } from "@/form/orderforms/TopUpform"
import { UpdateItemQtyFormData } from "@/form/orderforms/UpdateItemQtyForm"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useTopUp = () => {

    const topUprequest = async (amount: TopUpFormData) => {
        const response = await fetch(`${API_BASE_URL}/api/order/topup/create-topup-session`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(amount)
        })
        const data = await response.json()

        if (!response.ok)
            throw new Error()

        return data
    }

    const {
        mutate: topUp
    } = useMutation({
        mutationFn: topUprequest,
        onSuccess: async (data) => {
            if (data?.url) {
                window.location.href = data.url
            } else {
                console.error("沒有取得 Stripe URL")
            }
        },
        onError: (error: Error) => {
            console.log("QQ", error)
        },
    })

    return { topUp }

}

export const useAddToCart = () => {
    const addToCartRequest = async (body: AddToCartFormData) => {
        const response = await fetch(`${API_BASE_URL}/api/order/addtocart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(body)
        })

        const data = await response.json()
        if (!response.ok) {
            throw new Error()
        }
        return data
    }

    const {
        mutate: addToCart
    } = useMutation({
        mutationFn: addToCartRequest,
        onSuccess: async (data) => {
            alert("加入購物車成功！")
            window.location.reload()
        }
    })
    return { addToCart }
}

export const useGetCartItem = () => {

    const getCartItemReqest = async () => {
        const response = await fetch(`${API_BASE_URL}/api/order/cartitem`, {
            method: "GET",
            credentials: "include"
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error()
        }

        return data
    }
    const {
        data: cartItems,
        isLoading,
    } = useQuery({
        queryKey: ["fetchCartItem"],
        queryFn: getCartItemReqest
    })

    return { cartItems: cartItems?.data.items || [], isLoading }
}

export const useUpdateCartItemQty = () => {
    const queryClient = useQueryClient()
    const updateCartItemQtyRequest = async (body: UpdateItemQtyFormData) => {
        const response = await fetch(`${API_BASE_URL}/api/order/cartitem`, {
            method: "PATCH",
            credentials: "include",
            headers: {
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
        mutate: updateCartItemQty
    } = useMutation({
        mutationFn: updateCartItemQtyRequest,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["fetchCartItem"] })
        }
    })

    return { updateCartItemQty }
}


export const useDeleteCartItem = () => {
    const deleteCartItemRequest = async (body: deleteCartItemData) => {
        const response = await fetch(`${API_BASE_URL}/api/order/cartitem`, {
            method: "DELETE",
            credentials: "include",
            headers: {
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
        mutate: deleteCartItem
    } = useMutation({
        mutationFn: deleteCartItemRequest,
        onSuccess: async (data) => {
            alert("加入購物車成功！")
            window.location.reload()

        }
    })

    return { deleteCartItem }
}

export const useCheckOut = () => {

    const navigate = useNavigate()

    const request = async (formData: CheckOutFormData) => {
        const response = await fetch(`${API_BASE_URL}/api/order/checkout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        if (!response.ok) {
            throw new Error("付款失敗")
        }

        return response.json()
    }

    const {
        mutate: checkOut
    } = useMutation({
        mutationFn: request,
        onSuccess: async (data) => {
            if (data?.url) {
                window.location.href = data.url
            }
            else {
                alert("付款成功！")
                navigate("/")
            }

        }
    })

    return { checkOut }
}
