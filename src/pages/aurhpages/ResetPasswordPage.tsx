import { useCheckResetToken } from "@/api/authApi"
import PageContainer from "@/components/PageContainer"
import ResetPasswordForm from "@/form/authforms/ResetPasswordForm"
import { Navigate, useParams } from "react-router-dom"

const ResetPasswordPage = () => {
    const title = { label: "重設密碼" }
    const { resetToken } = useParams()

    if (!resetToken) {
        return <Navigate to="/" replace />;
    }
    const { isError, isLoading } = useCheckResetToken(resetToken)

    return (
        <PageContainer title={title}>
            <div className="flex flex-col items-center">
                <div className="w-2/3 p-5 mt-20  md:w-1/2">
                    {!isLoading && !isError ?
                        <ResetPasswordForm token={resetToken} />
                        :
                        <p className="text-center">請重新請求更改密碼連結</p>
                    }
                </div>
            </div>


        </PageContainer>
    )
}

export default ResetPasswordPage