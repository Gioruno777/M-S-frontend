import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import NavDropDownMenu from '@/components/dropdownmenu/NavDropDownMenu';


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

const MobileNav = ({ navLink, navButton, isLoggedIn, handleLogout, isPending }: Props) => {
    const baseClass = "px-5 py-1 flex flex-col items-center text-xs gap-1 font-black text-red-600 rounded-md border border-red-500"


    return (
        <nav className="flex items-center gap-4 mr-4">
            <Link
                to={navLink[0].path}
                className={baseClass}
            >
                <FontAwesomeIcon
                    icon={navLink[0].icon}
                    className='text-lg'
                />
                <span>{navLink[0].label}</span>

            </Link>


            {!isLoggedIn ?
                <Link
                    to={navButton[0].path}
                    className={baseClass}
                >
                    <FontAwesomeIcon
                        icon={navButton[0].icon}
                        className='text-lg'
                    />
                    <span>{navButton[0].label}</span>
                </Link>

                :
                <button
                    className={`${baseClass} cursor-pointer`}
                    onClick={() => handleLogout()}
                    disabled={isPending}
                >
                    <FontAwesomeIcon
                        icon={navButton[1].icon}
                        className='text-lg'
                    />
                    <span>{isPending ? "登出中..." : `${navButton[1].label}`}</span>
                </button>
            }
            <NavDropDownMenu
                navLink={navLink}
                navButton={navButton}
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
                isPending={isPending}
            />

        </nav >
    )
}

export default MobileNav