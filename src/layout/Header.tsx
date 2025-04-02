import { Link } from "react-router-dom"
import Logo from "../assets/Logo.png"
import { faBurger, faCrown, faPersonWalkingDashedLineArrowRight, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons"
import { UseLogout } from "@/api/authApi"
import MainNav from "./nav/MainNav"
import MobileNav from "./nav/MobileNav"

const Header = () => {
    const navLink = [
        { path: "/menu/main", icon: faBurger, label: "美味專區" },
        { path: "/member/main", icon: faCrown, label: "會員專區" },
        { path: "/order/cart", icon: faShoppingCart, label: "線上訂餐" },
    ]

    const navButton = [
        { path: "/auth/login", icon: faUser, label: "會員登入" },
        { path: "/", icon: faPersonWalkingDashedLineArrowRight, label: "會員登出" }
    ]

    // const { isLoggedIn } = useAuthContext()
    const isLoggedIn = false

    const logoutMutation = UseLogout()
    const handleLogout = () => {
        logoutMutation.mutate()
    }

    return (
        <div className="py-2">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/">
                    <img
                        src={Logo}
                        className="w-20 h-auto ml-4"
                    />
                </Link>

                <div className="md:hidden">
                    <MobileNav
                        navLink={navLink}
                        navButton={navButton}
                        isLoggedIn={isLoggedIn}
                        handleLogout={handleLogout}
                    />
                </div>

                <div className="hidden md:block">
                    <MainNav
                        navLink={navLink}
                        navButton={navButton}
                        isLoggedIn={isLoggedIn}
                        handleLogout={handleLogout}
                    />
                </div>
            </div>
        </div >
    )
}

export default Header