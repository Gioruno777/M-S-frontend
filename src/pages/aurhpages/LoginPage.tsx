import AuthContainer from '@/components/container/AuthContainer'
import RedLink from '@/components/RedLink'
import LoginForm from '@/form/authforms/LoginForm'
import { useLocation } from 'react-router-dom'

const LoginPage = () => {
    const location = useLocation()
    const title = { label: "登入" }
    const afterLoginPath = location.state?.from || "/"
    console.log(afterLoginPath)

    return (
        <AuthContainer title={title}>
            <div className="h-full grid grid-cols-2">
                <div className="flex col-span-2 justify-center items-center md:col-span-1 md:border-r-2 md:border-gray-300 md:border-dashed ">
                    <div className='w-2/3 p-5 space-y-3 bg-white'>
                        <div className="text-lg font-bold text-center md:text-2xl ">
                            會員登入
                        </div>
                        <LoginForm afterLoginPath={afterLoginPath} />
                    </div>
                </div>

                <div className="hidden md:flex justify-center items-center  md:col-span-1">
                    <div className="flex flex-col w-2/3 p-5  space-y-8 ">
                        <h1 className="text-xl font-bold text-center">加入MØS會員</h1>

                        <RedLink
                            to="/auth/signup"
                            width="w-full "
                        >
                            註冊
                        </RedLink>
                    </div>
                </div>
            </div>
        </AuthContainer>



    )
}

export default LoginPage

