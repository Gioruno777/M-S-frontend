import { getTransactions } from '@/api/userApi'
import MemberContainer from '@/components/container/MemberContainer'
import Loading from '@/components/Loading'
import { TransactionType } from '@/types'
import { faBurger } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


const TransactionPage = () => {
    const title = { icon: faBurger, label: " 會員卡交易明細" }
    const { transactions, isLoading } = getTransactions()

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
                                <th className="w-1/6 p-2">交易編號</th>
                                <th className="w-2/6 p-2">建立時間</th>
                                <th className="w-1/6 p-2">交易類型</th>
                                <th className="w-1/6 p-2">金額</th>
                                <th className="w-1/6 p-2">交易狀態</th>
                            </tr>
                        </thead>

                        {
                            transactions.map((transaction: TransactionType) => (

                                <tbody
                                    className="bg-white"
                                    key={transaction.id}
                                >
                                    <tr className="flex w-full py-2 border border-gray-300">
                                        <th className="w-1/6 p-2 text-red-700">
                                            <Link
                                                to={`/member/transaction/${transaction.id}`}
                                                className="text-red-700 underline"
                                            >
                                                {transaction.transactionId}
                                            </Link>
                                        </th>
                                        <th className="w-2/6 p-2">{transaction.createdAt}</th>
                                        <th className="w-1/6 p-2">
                                            {transaction.type === "TOP_UP" && "儲值"}
                                            {transaction.type === "PURCHASE" && "消費"}
                                        </th>
                                        <th className="w-1/6 p-2">
                                            {transaction.amount}
                                        </th>
                                        <th className="w-1/6 p-2">
                                            {transaction.status === "SUCCESS" && "成功"}
                                            {transaction.status === "PENDING" && "待付款"}
                                            {transaction.status === "FAILED" && "逾時"}
                                        </th>
                                    </tr>
                                </tbody>
                            ))}
                    </table>
                </div>
            }

        </MemberContainer >
    )
}

export default TransactionPage