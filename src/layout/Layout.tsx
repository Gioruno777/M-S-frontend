import React from "react"
import Footer from "./Footer"
import Header from "./Header"

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {

    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <div className="flex flex-1 pb-6 bg-[#f9ead9]">{children}</div>
            <Footer />
        </div>
    )
}

export default Layout