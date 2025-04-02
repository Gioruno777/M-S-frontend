import { useGetCartItem } from "@/api/orderApi"
import { useGetPersonalInfo } from "@/api/userApi"
import OrderContainer from "@/components/container/OrderContainer"
import OrderCard from "@/components/OrderCard"
import CheckOutForm from "@/form/orderforms/CheckOutForm"
import { ItemType } from "@/types"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const CheckoutPage = () => {
    const navigate = useNavigate()
    const title = { icon: faShoppingCart, label: " 確認訂單" }
    const { cartItems, isLoading: isCartLoading } = useGetCartItem()
    const { userInfo, isLoading: isUserLoading } = useGetPersonalInfo()

    let total = 0
    if (!isCartLoading) {

        total = cartItems.reduce((total: number, item: ItemType) => {
            return total + item.price * item.quantity
        }, 0)

    }

    useEffect(() => {
        if (!isCartLoading && cartItems.length === 0) {
            navigate("/order/cart", { replace: true }); // 導回購物車頁
        }
    }, [isCartLoading, cartItems, navigate])



    return (
        <OrderContainer title={title}>
            <div className='flex flex-col p-4 space-y-4 bg-gray-100'>
                <div
                    className="text-lg font-semibold md:text-2x"
                >訂單詳情</div>

                <div
                    className="flex flex-col md:grid grid-cols-2 gap-4"
                >
                    {!isCartLoading &&
                        cartItems.map((item: ItemType) => (
                            <OrderCard item={item} key={item.id} />
                        ))}
                </div>

                <div>
                    {!isUserLoading &&
                        <CheckOutForm amount={total} balance={userInfo.balance} />
                    }

                </div>

            </div>

        </OrderContainer>

    )
}

export default CheckoutPage