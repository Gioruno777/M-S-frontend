import { getPurchaseDetail } from "@/api/userApi"
import MemberContainer from "@/components/container/MemberContainer"
import { faBurger } from "@fortawesome/free-solid-svg-icons"

const PurchaseDetailPage = () => {
    const title = { icon: faBurger, label: " 歷史訂單", }
    const { purchaseDetail, isLoading } = getPurchaseDetail()
    console.log(purchaseDetail)
    return (
        <MemberContainer title={title}>
            <table
                border={20}
                className='flex w-full flex-col justify-center item-centers p-8 bg-red-100'
            >
                <thead className="flex w-full bg-white">
                    <tr className="flex w-full">
                        <th className="w-1/4 p-2">訂單編號</th>
                        <th className="w-1/4 p-2">訂單日期</th>
                        <th className="w-1/4 p-2">付款方式</th>
                        <th className="w-1/4 p-2">金額</th>
                    </tr>
                </thead>
                {!isLoading &&
                    purchaseDetail.map((detail: any) => (
                        <tbody
                            className="flex w-full bg-white"
                            key={detail.id}
                        >
                            <tr className="flex w-full">
                                <th className="w-1/4 p-2">{detail.id}</th>
                                <th className="w-1/4 p-2">{detail.createdAt}</th>
                                <th className="w-1/4 p-2">{detail.method}</th>
                                <th className="w-1/4 p-2">{detail.amount}</th>
                            </tr>
                        </tbody>
                    )
                    )
                }


            </table>
        </MemberContainer >
    )
}

export default PurchaseDetailPage