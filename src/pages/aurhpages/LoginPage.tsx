import PageContainer from '@/components/PageContainer'
import LoginForm from '@/form/authforms/LoginForm'
import { Link } from 'react-router-dom'

const LoginPage = () => {

    const title = { label: "登入" }

    return (
        <PageContainer title={title}>
            <div className="h-full grid grid-cols-2">
                <div className="col-span-2 flex flex-col items-center  md:col-span-1 md:border-r-2 md:border-gray-300 md:border-dashed ">
                    <div className='w-2/3 p-5 mt-20 space-y-3 bg-gray-100'>
                        <div className="text-lg font-bold text-center ">
                            會員登入
                        </div>
                        <LoginForm />
                    </div>
                </div>

                <div className="hidden md:flex flex-col items-center  md:col-span-1">
                    <div className="flex flex-col w-2/3 p-5 mt-20 space-y-8 ">
                        <h1 className="text-xl font-bold text-center">加入MOS會員</h1>

                        <Link
                            className='p-3 w-full text-white text-center bg-black rounded-md'
                            to="/auth/signup"
                        >
                            註冊
                        </Link>
                    </div>
                </div>
            </div>
        </ PageContainer >




    )
}

export default LoginPage

