import PageContainer from '@/components/PageContainer'
import ForgotPasswordForm from '@/form/authforms/ForgotPasswordForm'

const ForgotPasswordPage = () => {
    const title = { label: "忘記密碼" }
    return (
        <PageContainer title={title}>
            <div className="flex flex-col items-center">
                <div className="w-2/3 p-5 mt-20 bg-gray-100 md:w-1/2">
                    <ForgotPasswordForm />
                </div>
            </div>
        </PageContainer >
    )
}

export default ForgotPasswordPage