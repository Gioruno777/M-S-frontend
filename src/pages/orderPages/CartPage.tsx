import { useGetCartItem } from '@/api/orderApi'
import OrderContainer from '@/components/container/OrderContainer'
import CartCard from '@/components/CartCard'
import { ItemType } from '@/types'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import Loading from '@/components/Loading'
import { useMemo } from 'react'

const CartPage = () => {

    const title = { icon: faShoppingCart, label: " 線上訂餐" }
    const { items, isLoading } = useGetCartItem()

    const total = useMemo(() => {
        if (!items) return 0

        return items.reduce((total: number, item: ItemType) => {
            return total + item.price * item.quantity
        }, 0)
    }, [items])

    return (
        <OrderContainer title={title}>
            {isLoading ?
                <Loading />
                :
                <>
                    {total === 0 ?
                        <div className='flex flex-col justify-center items-center min-h-full p-4 space-y-4 text-xl bg-gray-100 md:text-2xl'>
                            <span className='flex items-center space-x-4'>
                                <FontAwesomeIcon
                                    icon={faShoppingCart}
                                    className='text-red-300 text-3xl'
                                />
                                <span>購物車裡目前沒有商品</span>
                                <Link
                                    to="/menu/main"
                                    className="text-blue-500 underline"
                                >
                                    立即選購
                                </Link>
                            </span>
                        </div>
                        :
                        <div className='flex flex-col p-4 space-y-4 bg-gray-100'>
                            {items.map((item: ItemType) => (
                                <CartCard item={item} key={item.id} />
                            ))}
                            < div className="flex justify-end w-full">
                                <div className="flex flex-col space-y-2  px-2 ">
                                    <div className='px-2 text-xs  md:text-2xl'>
                                        總計: {total} 元
                                    </div>
                                    <Link
                                        to="/cart/checkout"
                                        className=" px-2 p-1 text-sm font-semibold text-white bg-red-700 rounded-md cursor-pointer md:text-lg text-center"
                                    >
                                        確認訂單
                                    </Link>
                                </div>
                            </div>
                        </div>
                    }
                </>
            }
        </OrderContainer >
    )
}
export default CartPage