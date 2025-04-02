import { ItemType } from '@/types'

type Props = {
    item: ItemType
}


const OrderCard = ({ item }: Props) => {
    const { imageUrl, name, price, quantity } = item

    return (
        <div className="flex w-full bg-white">
            <div className="flex w-1/3 flex justify-center ">
                <img
                    src={imageUrl}
                    alt={name}

                />
            </div>

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