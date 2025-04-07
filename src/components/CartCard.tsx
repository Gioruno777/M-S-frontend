import { useDeleteCartItem } from "@/api/orderApi"
import UpdateItemQtyForm from "@/form/orderforms/UpdateItemQtyForm"
import { ItemType } from "@/types"

type Props = {
    item: ItemType
}

export type deleteCartItemData = {
    productId: string
}

const CartCard = ({ item }: Props) => {
    const { productId, imageUrl, name, price, quantity } = item

    const { deleteCartItem, isPending } = useDeleteCartItem()

    const delItem = { productId: productId }

    const handleDeleteCartItem = (delItem: deleteCartItemData) => {
        deleteCartItem(delItem)
    }

    return (
        <div className="flex w-full bg-white">
            <div className="flex w-1/9 flex justify-center  bg-red-100">
                <img
                    src={imageUrl}
                    alt={name}

                />
            </div>

            <div className="flex w-2/9 flex justify-center items-center ">
                <div
                    className="text-xs font-semibold md:text-2xl "
                >
                    {name}
                </div>

            </div>

            <div className="flex w-2/9 flex justify-center items-center">
                <div
                    className="text-xs font-semibold text-red-700 md:text-2xl "
                >
                    $ {price}
                </div>

            </div>
            <div className="flex w-2/9 flex justify-center items-center ">
                <UpdateItemQtyForm quantity={quantity} productId={productId} />
            </div>
            <div className=" flex w-2/9 flex justify-center items-center ">
                <button
                    disabled={isPending}
                    className="w-4/5 p-1 text-xs font-semibold text-white bg-red-700 rounded-md cursor-pointer md:text-lg text-center"
                    onClick={() => handleDeleteCartItem(delItem)}
                >
                    {isPending ? "刪除中..." : "刪除商品"}
                </button>
            </div>
        </div >
    )
}

export default CartCard