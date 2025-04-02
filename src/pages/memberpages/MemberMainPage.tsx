import { useGetPersonalInfo } from '@/api/userApi'
import MemberContainer from '@/components/container/MemberContainer'
import TopUpform from '@/form/orderforms/TopUpform'
import { faBurger } from '@fortawesome/free-solid-svg-icons'


const MemberMainPage = () => {
    const title = { icon: faBurger, label: " 會員資訊", }
    const { userInfo, isLoading } = useGetPersonalInfo()
    return (
        <MemberContainer title={title}>
            {
                !isLoading &&
                <div className='flex flex-col p-4 space-y-3 '>
                    <div className='md:px-2 md:text-2xl md:font-medium '
                    >
                        {userInfo.userName},您好!
                    </div>

                    <div className='flex justify-center'>
                        <img
                            src={userInfo.photo}
                            className='w-1/2 p-2 rounded-md shadow-lg md:w-3/7'
                        />
                    </div>

                    <div className='flex justify-center w-full '>
                        <div className="w-1/2 p-2 rounded-md shadow-lg md:p-4 md:w-3/7">
                            <TopUpform balance={userInfo.balance} />
                        </div>
                    </div>

                </div>

            }

        </MemberContainer >
    )
}

export default MemberMainPage