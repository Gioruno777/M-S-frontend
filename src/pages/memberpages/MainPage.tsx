import { useGetUserInfo } from '@/api/userApi'
import MemberContainer from '@/components/container/MemberContainer'
import Loading from '@/components/Loading'
import { faBurger } from '@fortawesome/free-solid-svg-icons'


const MemberMainPage = () => {
    const title = { icon: faBurger, label: " 會員資訊", }
    const { user, isLoading } = useGetUserInfo()

    return (
        <MemberContainer title={title}>
            {
                isLoading ?
                    <div className='flex h-full flex-justify-center items-center m-3'>
                        <Loading />
                    </div>
                    :
                    <div className='flex flex-col p-4 space-y-3 '>
                        <div className='md:px-2 md:text-2xl md:font-medium '
                        >
                            {user.userName},您好!
                        </div>

                        <div className='flex justify-center'>
                            <img
                                src={user.photo}
                                className='w-1/2 p-2 rounded-md shadow-lg md:w-3/7'
                            />
                        </div>

                        <div className='flex justify-center w-full '>
                            <div className="w-1/2 p-2 rounded-md shadow-lg md:p-4 md:w-3/7">
                                {/* <TopUpform balance={user.balance} /> */}
                            </div>
                        </div>

                    </div>
            }

        </MemberContainer >
    )
}

export default MemberMainPage