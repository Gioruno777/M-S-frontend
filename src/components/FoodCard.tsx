import { useGetStock } from "@/api/stockApi"
import { useAuthContext } from "@/context/AuthContext"
import AddToCartForm from "@/form/orderforms/AddToCartForm"
import { foodType } from "@/types"
import { Link } from "react-router-dom"

type Props = {
    food: foodType
}

const FoodCard = (food: Props) => {
    const { _id, image, name, price, seasonal, limited, category } = food.food
    const { isLoggedIn } = useAuthContext()
    const { stock, isLoading } = useGetStock(_id)
    return (
        <div className="w-full h-full flex flex-col bg-gray-100 rounded-md shadow-lg  overflow-hidden">
            {!isLoggedIn ?
                <Link
                    to={`/menu/${category}/${_id}`}
                    className="flex flex-col bg-gray-100 border-10 border-gray-100 rounded-md ">
                    <img src={image} alt={name} />
                    <div className="h-15 flex space-x-2 p-2 mb-2 bg-white">
                        {seasonal && <span
                            className="w-10 h-10 flex items-center justify-center text-3xl font-bold text-red-500 bg-white border-4 border-red-500 rounded-full"
                        >季
                        </span>}

                        {limited && <span
                            className="w-10 h-10 flex flex-col items-center justify-center text-xs font leading-none text-white bg-blue-600 border-4 border-blue-600 rounded-md md:text-bold md:font-bold md:text-base"
                        >限量<br />供應
                        </span>}
                    </div>

                    <h3 className="mb-2 text-lg text-gray-800">{name}</h3>
                    <h3 className="mb-2 text-lg font-semibold text-yellow-600">$ {price}</h3>
                </Link>
                :
                <div className="flex h-full flex-col bg-gray-100 border-10 border-gray-100 rounded-md">

                    <Link
                        to={`/menu/${category}/${_id}`}
                    >
                        <img src={image} alt={name} />
                    </Link>

                    <div className="h-15 flex space-x-2 p-2 mb-2 bg-white">
                        {seasonal && <span
                            className="w-10 h-10 flex items-center justify-center text-3xl font-bold text-red-500 bg-white border-4 border-red-500 rounded-full"
                        >季
                        </span>}

                        {limited && <span
                            className="w-10 h-10 flex flex-col items-center justify-center text-xs font leading-none text-white bg-blue-600 border-4 border-blue-600 rounded-md md:text-bold md:font-bold md:text-base"
                        >限量<br />供應
                        </span>}
                    </div>

                    <h3 className="min-h-12 text-gray-800 md:text-lg md:min-h-0 md:mb-2 ">{name}</h3>
                    <div className="flex flex justify-between mb-2 text-lg font-semibold">
                        <h3 className="text-yellow-600">$ {price}</h3>

                        {isLoading ?
                            < h3 className="text-red-600">
                                庫存: Loading
                            </h3>
                            :
                            < h3 className="text-red-600">
                                庫存:{stock.stock}
                            </h3>
                        }
                    </div>

                    <AddToCartForm productId={_id} />
                </div>
            }

        </div >
    )
}

export default FoodCard