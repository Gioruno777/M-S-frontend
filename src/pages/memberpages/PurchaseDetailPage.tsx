import { getPurchaseDetail } from "@/api/userApi"
import ErrorContainer from "@/components/container/ErrorContainer"
import MemberContainer from "@/components/container/MemberContainer"
import Loading from "@/components/Loading"
import OrderCard from "@/components/OrderCard"
import { Input } from "@/components/ui/input"
import { ItemType } from "@/types"
import { faBurger } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react"
import { useParams } from "react-router-dom"


const PurchaseDetailPage = () => {
    const title = { icon: faBurger, label: " 訂單詳情", }
    const { purchaseId } = useParams()
    const { purchase, isLoading, isError } = getPurchaseDetail(purchaseId)

    useEffect(() => {
        if (isLoading) return

        const params = new URLSearchParams(window.location.search)
        const isSuccess = params.get("order_success") === "true"

        if (isSuccess) {
            alert("下單成功！")
            window.history.replaceState(null, "", `/member/purchase/${purchase.id}`)
        }

    }, [isLoading,])


    return (
        <MemberContainer title={title} note={"訂單詳情"}>
            {isLoading ?
                <Loading />
                :
                <>
                    {(isError || purchase === null) &&
                        <ErrorContainer>
                            ERROR 😂😂😂
                        </ErrorContainer>
                    }
                    {!isError &&
                        <div className='p-4 h-full bg-gray-100'>
                            <div className="flex h-full flex-col p-4 space-y-4 text-lg font-semibold bg-white md:text-xl ">
                                <div>訂單編號: {purchase.purchaseId}</div>
                                <div>日期: {purchase.createdAt}</div>
                                <div>金額: {purchase.amount}元</div>
                                <div>
                                    付款方式:
                                    {purchase.method === "MEMBER_CARD" && " 會員卡"}
                                    {purchase.method === "STRIPE" && " 信用卡"}
                                </div>
                                <div>
                                    付款日期: {purchase.paidAt}
                                </div>
                                <div>商品詳情:</div>
                                <div className="flex flex-col gap-4 md:grid grid-cols-2">
                                    {purchase.items.map((item: ItemType) => (
                                        <OrderCard item={item} key={item.id} />
                                    ))}
                                </div>
                                <div>
                                    備註:
                                </div>
                                <div>
                                    <Input value={purchase.note} readOnly className="text-black" />
                                </div>
                            </div>
                        </div>
                    }
                </>
            }
        </MemberContainer >
    )
}

export default PurchaseDetailPage