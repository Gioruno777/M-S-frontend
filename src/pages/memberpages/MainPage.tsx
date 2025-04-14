import { useGetUserInfo } from '@/api/userApi'
import MemberContainer from '@/components/container/MemberContainer'
import Loading from '@/components/Loading'
import TopUpform from '@/form/orderforms/TopUpform'
import { faBurger } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const MemberMainPage = () => {
    const title = { icon: faBurger, label: " 會員主頁", }
    const { user, isLoading } = useGetUserInfo()
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoading) return

        const params = new URLSearchParams(window.location.search)
        const isCancelled = params.get("topup_cancelled") === "true"

        if (isCancelled) {
            navigate("/member/main", { replace: true })
            alert("儲值取消！")
        }

    }, [isLoading])

    return (
        <MemberContainer title={title}>
            {
                isLoading ?
                    <div className='flex h-full flex-justify-center items-center m-3'>
                        <Loading />
                    </div>
                    :
                    <div className='flex w-full flex-col p-4 mb-5 space-y-3 '>
                        <div className='md:px-2 md:text-2xl md:font-medium '
                        >
                            {user.userName},您好!
                        </div>

                        <div className='flex w-full justify-center'>
                            <img
                                src={user.photo}
                                className='w-2/3 p-2 rounded-md shadow-lg md:w-3/7'
                            />
                        </div>

                        <div className='flex w-full justify-center w-full '>
                            <div className="w-2/3 p-2 rounded-md shadow-lg md:p-4 md:w-3/7">
                                <TopUpform balance={user.balance} />
                            </div>
                        </div>

                    </div>
            }

        </MemberContainer >
    )
}

export default MemberMainPage