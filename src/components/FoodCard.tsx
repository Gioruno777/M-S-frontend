import AddToCartForm from "@/form/orderforms/AddToCartForm"
import { foodType } from "@/types"
import { Link } from "react-router-dom"

type Props = {
    food: foodType
}

const FoodCard = (food: Props) => {
    const { _id, image, name, price, seasonal, limited, category } = food.food
    // const { isLoggedIn } = useAuthContext()
    const isLoggedIn = false
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
                            className="w-10 h-10 flex flex-col items-center justify-center text-blod font-bold leading-none text-white bg-blue-600 border-4 border-blue-600 rounded-md"
                        >限量<br />供應
                        </span>}
                    </div>

                    <h3 className="mb-2 text-lg text-gray-800">{name}</h3>
                    <h3 className="mb-2 text-lg font-semibold text-yellow-600">$ {price}</h3>
                </Link>
                :
                <div className="flex flex-col bg-gray-100 border-10 border-gray-100 rounded-md">

                    <Link
                        to={`/menu/${category}/${_id}`}
                    >
                        <img src={image} alt={name} />
                    </Link>

                    <div className=" h-15 flex space-x-2 p-2 mb-2 bg-white">
                        {seasonal && <span
                            className="w-10 h-10 flex items-center justify-center text-3xl font-bold text-red-500 bg-white border-4 border-red-500 rounded-full"
                        >季
                        </span>}

                        {limited && <span
                            className="w-10 h-10 flex flex-col items-center justify-center text-blod font-bold leading-none text-white bg-blue-600 border-4 border-blue-600 rounded-md"
                        >限量<br />供應
                        </span>}
                    </div>

                    <h3 className="mb-2 text-lg text-gray-800 ">{name}</h3>
                    <h3 className="mb-2 text-lg font-semibold text-yellow-600">$ {price}</h3>

                    <AddToCartForm productID={_id} />
                </div>
            }

        </div >
    )
}

export default FoodCard