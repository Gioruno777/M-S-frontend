import { Link } from "react-router-dom"

type Props = {
    children: React.ReactNode
    to: string
    width: string
}

const RedLink = ({ children, to, width }: Props) => {
    return (
        <Link
            to={to}
            className={`${width} p-3 text-sm font-semibold text-white bg-red-700 rounded-md md:text-lg text-center`}
        >
            {children}
        </Link>
    )
}

export default RedLink