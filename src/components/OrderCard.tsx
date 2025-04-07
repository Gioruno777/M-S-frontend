import { ItemType } from '@/types'
import { Link } from 'react-router-dom'

type Props = {
    item: ItemType
}

const idToCategory = (productId: string) => {
    const prefixMap: Record<string, string> = {
        M: "main",
        S: "side",
        B: "beverage",
    }
    const prefix = productId[0].toUpperCase()
    const category = prefixMap[prefix]

    return category
}

const OrderCard = ({ item }: Props) => {
    const { imageUrl, name, price, quantity, productId } = item
    return (
        <div className="flex w-full bg-white">
            <Link
                to={`/menu/${idToCategory(productId)}/${productId}`}
                className="flex w-1/3 flex justify-center ">
                <img
                    src={imageUrl}
                    alt={name}
                />
            </Link>

            <div className="flex w-2/3 flex-col justify-center items-center gap-8">
                <div
                    className="text-lg font-semibold md:text-2xl "
                >
                    {name}
                </div>

                <div
                    className="text-lg font-semibold text-red-700 md:text-2xl "
                >
                    ${price} × {quantity}
                </div>
            </div>
        </div>
    )
}

export default OrderCard