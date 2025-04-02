import Footer from "./Footer"
import Header from "./Header"
import { Outlet } from "react-router-dom"

const Layout = () => {

    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <div className="flex flex-1 pb-6 bg-[#f9ead9]">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout