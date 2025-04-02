import PageContainer from '@/components/PageContainer'
import SignUpForm from '@/form/authforms/SignUpForm'

const SignUpPage = () => {
    const title = { label: "註冊" }
    return (
        <PageContainer title={title}>
            <div className="flex flex-col items-center">
                <div className='w-2/3 p-5 mt-20  bg-gray-100 md:w-1/2'>
                    <SignUpForm />
                </div>
            </div>
        </PageContainer>
    )
}

export default SignUpPage