import AuthContainer from '@/components/container/AuthContainer'
import ForgotPasswordForm from '@/form/authforms/ForgotPasswordForm'

const ForgotPasswordPage = () => {
    const title = { label: "忘記密碼" }
    return (
        <AuthContainer title={title}>
            <div className="flex h-full flex-col justify-center items-center">
                <div className='w-1/2 p-5 my-8 space-y-3 bg-white'>
                    <div className="text-lg font-bold text-center md:text-2xl ">
                        忘記密碼
                    </div>
                    <ForgotPasswordForm />
                </div>
            </div>
        </AuthContainer >
    )
}

export default ForgotPasswordPage