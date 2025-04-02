import MemberContainer from '@/components/container/MemberContainer'
import UpdatePasswordForm from '@/form/userforms/UpdatePasswordForm'
import { faBurger } from '@fortawesome/free-solid-svg-icons'

const MemberUpdatePasswordPage = () => {
    const title = { icon: faBurger, label: "更改密碼", }
    return (
        <MemberContainer title={title}>
            <div className='flex justify-center item-centers p-8 bg-red-100'>
                <div className='w-2/3'>
                    <UpdatePasswordForm />
                </div>

            </div>
        </MemberContainer>

    )
}

export default MemberUpdatePasswordPage