import { getTransaction } from '@/api/userApi'
import MemberContainer from '@/components/container/MemberContainer'
import Loading from '@/components/Loading'
import { TransactionType } from '@/types'
import { faBurger } from '@fortawesome/free-solid-svg-icons'


const TransactionPage = () => {
    const title = { icon: faBurger, label: " 交易明細" }
    const { transactions, isLoading } = getTransaction()

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
                                <th className="w-1/4 p-2">交易編號</th>
                                <th className="w-1/4 p-2">交易日期</th>
                                <th className="w-1/4 p-2">交易內容</th>
                                <th className="w-1/4 p-2">餘額</th>
                            </tr>
                        </thead>

                        {
                            transactions.map((transaction: TransactionType) => (

                                <tbody
                                    className="bg-white"
                                    key={transaction.id}
                                >
                                    <tr className="flex w-full py-2 border border-gray-300">
                                        <th className="w-1/4 p-2 text-red-700">
                                            {transaction.transactionId}
                                        </th>
                                        <th className="w-1/4 p-2">{transaction.createdAt}</th>
                                        <th className="w-1/4 p-2">
                                            {transaction.record}
                                        </th>
                                        <th className="w-1/4 p-2">
                                            {transaction.type === "TOP_UP" && (transaction.previousBalance + transaction.amount)}
                                            {transaction.type === "PURCHASE" && (transaction.previousBalance - transaction.amount)}
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