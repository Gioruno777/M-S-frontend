import { getPurchases } from "@/api/userApi"
import MemberContainer from "@/components/container/MemberContainer"
import Loading from "@/components/Loading"
import { PurchaseType } from "@/types"
import { faBurger } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

const PurchasePage = () => {
    const title = { icon: faBurger, label: " 歷史訂單", }
    const { purchases, isLoading } = getPurchases()
    return (
        <MemberContainer title={title}>
            {isLoading ?
                <Loading />
                :
                <div className='h-full bg-gray-100'>
                    <table
                        border={20}
                        className='flex w-full flex-col justify-center item-centers p-3 text-sm text-center md:text-lg'
                    >
                        <thead className="flex w-full bg-white">
                            <tr className="flex w-full border border-gray-300 ">
                                <th className="w-1/4 p-2">訂單編號</th>
                                <th className="w-1/4 p-2">訂單日期</th>
                                <th className="w-1/4 p-2">付款方式</th>
                                <th className="w-1/4 p-2">金額</th>
                            </tr>
                        </thead>

                        {
                            purchases.map((purchase: PurchaseType) => (

                                <tbody
                                    className="bg-white"
                                    key={purchase.id}
                                >
                                    <tr className="flex w-full py-2 border border-gray-300">
                                        <th className="w-1/4 p-2">
                                            <Link
                                                to={`/member/purchase/${purchase.id}`}
                                                className="text-red-700 underline"
                                            >
                                                {purchase.purchaseId}
                                            </Link>
                                        </th>
                                        <th className="w-1/4 p-2">{purchase.createdAt}</th>
                                        <th className="w-1/4 p-2">
                                            {purchase.method === "MEMBER_CARD" && "會員卡"}
                                            {purchase.method === "STRIPE" && "信用卡"}
                                        </th>
                                        <th className="w-1/4 p-2">{purchase.amount}</th>
                                    </tr>
                                </tbody>
                            ))}
                    </table>
                </div>
            }

        </MemberContainer >
    )
}

export default PurchasePage