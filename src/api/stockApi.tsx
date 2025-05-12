import { useQuery } from "@tanstack/react-query"
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL



export const useGetStock = (id?: string) => {
    const request = async () => {
        const response = await fetch(`${API_BASE_URL}/api/stock/${id}`, {
            method: "GET"
        })

        if (!response.ok) {
            throw new Error("Failed to fetch Stock");
        }
        return response.json()
    }

    const {
        data,
        isLoading,
    } = useQuery({
        queryKey: ["getStock", id],
        queryFn: request
    })
    const stock = data?.data?.stock ?? null

    return { stock, isLoading }
}