import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetAllFood = (sortBy: string, category: string) => {
    const requset = async () => {
        const response = await fetch(`${API_BASE_URL}/api/menu?sort=${sortBy}&category=${category}`, {
            method: "GET"
        })

        if (!response.ok) {
            throw new Error("Failed to fetch Food");
        }
        return response.json()
    }

    const {
        data,
        isLoading,
    } = useQuery({
        queryKey: ["getAllFood", sortBy],
        queryFn: requset
    })

    const items = data?.data?.items ?? []

    return { items, isLoading }
}

export const useGetFoodDetail = (id?: string) => {
    const requset = async () => {
        const response = await fetch(`${API_BASE_URL}/api/menu/${id}`, {
            method: "GET"
        })

        if (!response.ok) {
            throw new Error("Failed to fetch food detail");
        }

        return response.json()
    }
    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["getFoodDetail", id],
        queryFn: requset,
        enabled: !!id
    })

    const item = data?.data?.item ?? null

    return { item, isLoading, isError }

}

export const useSearchFood = (sortBy: string, category: string, keyword: string,) => {

    const requset = async () => {
        const response = await fetch(`${API_BASE_URL}/api/menu/search?keyword=${keyword}&sort=${sortBy}&category=${category}`, {
            method: "GET"
        })

        if (!response.ok) {
            throw new Error("Fail to search food data");
        }

        return response.json()
    }
    const {
        data,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["fetchSearchFoodResult", sortBy, keyword],
        queryFn: requset
    })
    const items = data?.data?.items ?? []

    return { items, isLoading, isError }
}

