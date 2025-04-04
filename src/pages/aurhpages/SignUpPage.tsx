
import AuthContainer from '@/components/container/AuthContainer'
import SignUpForm from '@/form/authforms/SignUpForm'

const SignUpPage = () => {
    const title = { label: "註冊" }
    return (
        <AuthContainer title={title}>
            <div className="flex h-full flex-col justify-center items-center">
                <div className='w-2/3 p-5 my-8 space-y-3 bg-white'>
                    <div className="text-lg font-bold text-center md:text-2xl ">
                        會員註冊
                    </div>
                    <SignUpForm />
                </div>
            </div>
        </AuthContainer>
    )
}

export default SignUpPage