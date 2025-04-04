import { useCheckResetToken } from "@/api/authApi"
import AuthContainer from "@/components/container/AuthContainer"
import ErrorContainer from "@/components/container/ErrorContainer"
import Loading from "@/components/Loading"
import ResetPasswordForm from "@/form/authforms/ResetPasswordForm"
import { Navigate, useParams } from "react-router-dom"

const ResetPasswordPage = () => {
    const title = { label: "重設密碼" }
    const { resetToken } = useParams()
    if (!resetToken) {
        return <Navigate to="/" replace />
    }
    const { isError, isLoading } = useCheckResetToken(resetToken)

    return (
        <AuthContainer title={title}>
            <div className="flex h-full flex-col justify-center items-center">
                {isLoading ?
                    <Loading />
                    :
                    <>
                        {
                            isError ?
                                <ErrorContainer
                                >
                                    請求逾時😂😂😂
                                </ErrorContainer>
                                :
                                <div className='w-1/2 p-5 my-8 space-y-2 bg-white'>
                                    <div className="text-lg font-bold text-center md:text-2xl "
                                    >
                                        重設密碼
                                    </div>
                                    <ResetPasswordForm token={resetToken} />
                                </div>
                        }
                    </>
                }
            </div>
        </AuthContainer >
    )
}

export default ResetPasswordPage