import { useGetCartItem } from "@/api/orderApi"
import { useGetUserInfo } from "@/api/userApi"
import OrderContainer from "@/components/container/OrderContainer"
import Loading from "@/components/Loading"
import OrderCard from "@/components/OrderCard"
import CheckOutForm from "@/form/orderforms/CheckOutForm"
import { ItemType } from "@/types"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const CheckoutPage = () => {
    const navigate = useNavigate()
    const title = { icon: faShoppingCart, label: " 確認訂單" }
    const { items, isLoading: isCartLoading } = useGetCartItem()
    const { user, isLoading: isUserLoading } = useGetUserInfo()

    let total = 0
    if (!isCartLoading) {

        total = items.reduce((total: number, item: ItemType) => {
            return total + item.price * item.quantity
        }, 0)

    }

    useEffect(() => {
        if (isCartLoading) return

        const params = new URLSearchParams(window.location.search)
        const isSuccess = params.get("order_success") === "true"
        const isCancelled = params.get("order_cancelled") === "true"

        if (isSuccess) {
            alert("下單成功！")
            window.history.replaceState(null, "", "/cart/checkout")
        }

        if (isCancelled) {
            alert("請重新付款！")
            window.history.replaceState(null, "", "/cart/checkout")
        }

    }, [isCartLoading])

    useEffect(() => {
        if (isCartLoading) return
        if (!isCartLoading && items.length === 0) {
            navigate("/cart/main", { replace: true })
        }
    }, [isCartLoading, items, navigate])





    return (
        <OrderContainer title={title}>

            {isCartLoading ?
                <Loading />
                :
                <div className='flex flex-col p-4 space-y-4 text-lg font-semibold bg-gray-100  md:text-2xl  '>
                    <div
                        className="gap-4 "
                    >訂單詳情
                    </div>

                    <div className="flex flex-col gap-4 md:grid grid-cols-2">
                        {items.map((item: ItemType) => (
                            <OrderCard item={item} key={item.id} />
                        ))}
                    </div>

                    <div className="flex gap-4 justify-end mr-3">
                        總計: {total}元
                    </div>
                    <div>
                        {!isUserLoading &&
                            <CheckOutForm amount={total} balance={user.balance} />
                        }
                    </div>
                </div>
            }
        </OrderContainer >

    )
}

export default CheckoutPage