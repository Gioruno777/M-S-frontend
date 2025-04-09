import { useGetTransactionDeatail } from "@/api/userApi"
import ErrorContainer from "@/components/container/ErrorContainer"
import MemberContainer from "@/components/container/MemberContainer"
import Loading from "@/components/Loading"
import RedLink from "@/components/RedLink"
import { faBurger } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const TransactionDetailPage = () => {
    const title = { icon: faBurger, label: " 訂單詳情", }
    const { transactionId } = useParams()
    const { transaction, isLoading, isError } = useGetTransactionDeatail(transactionId)

    useEffect(() => {
        if (isLoading) return

        const params = new URLSearchParams(window.location.search)
        const isSuccess = params.get("topup_success") === "true"

        if (isSuccess) {
            alert("儲值成功！")
            window.history.replaceState(null, "", "/member/transaction/${transactionId}")
        }
    }, [isLoading])

    return (
        <MemberContainer title={title} note={"訂單詳情"}>
            {isLoading ?
                <Loading />
                :
                <>
                    {(isError || transaction === null) &&
                        <ErrorContainer>
                            ERROR 😂😂😂
                        </ErrorContainer>
                    }
                    {!isError &&
                        <div className="flex w-full h-full p-4  bg-gray-100">
                            <div className='flex w-full h-full flex-col p-4 justify-center items-center justify-center items-centertext-lg font-semibold bg-white md:text-xl'>
                                <div className="flex w-2/3 flex-col space-y-4 md:w-1/2">
                                    <div>交易編號: {transaction.transactionId}</div>
                                    <div>成立日期: {transaction.createdAt}</div>
                                    <div>交易金額: {transaction.amount}</div>
                                    <div>付款方式: {transaction.method === "STRIPE" && "信用卡"}
                                        {transaction.method === "MEMBER_CARD" && "信用卡"}
                                    </div>
                                    <div>交易內容: {transaction.record}</div>
                                    <div>
                                        狀態: {transaction.status === "SUCCESS" && "成功"}
                                        {transaction.status === "PENDING" && "待付款"}
                                        {transaction.status === "FAILED" && "逾時"}
                                    </div>
                                    {transaction.status === "PENDING" &&
                                        <RedLink
                                            to={transaction.sessionUrl}
                                            width="w-full"
                                        >
                                            前往付款
                                        </RedLink>
                                    }
                                    {transaction.status === "SUCCESS" &&
                                        <>
                                            <div>付款日期: {transaction.paidAt}</div>
                                            <div>會員卡餘額: {transaction.type === "PURCHASE" ?
                                                (transaction.previousBalance - transaction.amount)
                                                :
                                                (transaction.previousBalance + transaction.amount)
                                            }
                                            </div>
                                            <RedLink
                                                to={"/member/transaction"}
                                                width="w-full"
                                            >
                                                返回
                                            </RedLink>
                                        </>
                                    }

                                    {transaction.status === "FAILED" &&
                                        <>
                                            <RedLink
                                                to={"/member/transcaion"}
                                                width="w-full"
                                            >
                                                返回
                                            </RedLink>
                                        </>
                                    }


                                </div>
                            </div>
                        </div>
                    }
                </>
            }
        </MemberContainer >
    )
}

export default TransactionDetailPage