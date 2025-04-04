import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

type Props = {
    navLink: {
        path: string;
        icon: IconDefinition;
        label: string;
    }[],

    navButton: {
        path: string;
        icon: IconDefinition;
        label: string;
    }[],
    isLoggedIn: boolean,
    handleLogout: () => void,
    isPending: boolean
}

const MainNav = ({ navLink, navButton, isLoggedIn, handleLogout, isPending }: Props) => {

    const baseClass = "mt-4 px-4 py-4 flex items-center gap-2 text-lg font-semibold text-yellow-500 rounded-md hover:bg-red-500  hover:text-white"

    return (
        <nav className="flex items-center gap-6">

            {navLink.map((link, index) => (
                <Link
                    key={index}
                    to={link.path}
                    className={baseClass}
                >
                    <FontAwesomeIcon icon={link.icon} />
                    <span>{link.label}</span>

                </Link>
            ))}

            {!isLoggedIn ?
                <Link
                    to={navButton[0].path}
                    className={baseClass}
                >
                    <FontAwesomeIcon icon={navButton[0].icon} />
                    {navButton[0].label}
                </Link>

                :
                <button
                    className={`${baseClass} cursor-pointer`}
                    onClick={() => handleLogout()}
                    disabled={isPending}
                >
                    <FontAwesomeIcon icon={navButton[1].icon} />
                    {isPending ? "登出中..." : `${navButton[1].label}`}
                </button>
            }
        </nav >
    )
}

export default MainNav