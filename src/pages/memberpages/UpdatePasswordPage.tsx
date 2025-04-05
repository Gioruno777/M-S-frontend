import MemberContainer from '@/components/container/MemberContainer'
import UpdatePasswordForm from '@/form/userforms/UpdatePasswordForm'
import { faBurger } from '@fortawesome/free-solid-svg-icons'

const UpdatePasswordPage = () => {
    const title = { icon: faBurger, label: "更改密碼", }
    return (
        <MemberContainer title={title}>
            <div className="flex h-full flex-col justify-center items-center">
                <div className='w-2/3 p-4 my-8 space-y-3 shadow-lg bg-white'>
                    <div className="text-lg font-bold text-center md:text-2xl ">
                        會員註冊
                    </div>
                    <UpdatePasswordForm />
                </div>
            </div>
        </MemberContainer>

    )
}

export default UpdatePasswordPage