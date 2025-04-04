import { faPlay, IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import NavButton from "../NavButton"
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type menuItemType = {
    path: string;
    icon: IconDefinition;
    label: string;
}

type Props = {
    navLink: menuItemType[]
    navButton: menuItemType[]
    isLoggedIn: boolean,
    handleLogout: () => void
}

const NavDropDownMenu = ({ navLink, navButton, isLoggedIn, handleLogout }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuItems, setMenuItems] = useState<menuItemType[]>([])
    const itemsClassname = "flex justify-between w-full items-center gap-2 p-2 text-lg font-semibold text-yellow-600 bg-white  rounded-md"

    const location = useLocation()
    const [menuWidth, setMenuWidth] = useState("100vw")


    useEffect(() => {
        const updateWidth = () => {
            const availableWidth = document.documentElement.clientWidth
            setMenuWidth(`${availableWidth}px`);
        };

        updateWidth()
        window.addEventListener("resize", updateWidth);

        return () => {
            window.removeEventListener("resize", updateWidth);
        };
    }, [location.pathname]);


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMenuItems([])
                setIsOpen(false)

            }
        };
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const timeoffset = 80
    const addMenuItems = async () => {
        for (let i = 0; i < navLink.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, timeoffset - 20))
            setMenuItems((prev) => [...prev, navLink[i]])
        }
        await new Promise((resolve) => setTimeout(resolve, timeoffset))
        isLoggedIn ? setMenuItems((prev) => [...prev, navButton[1]]) : setMenuItems((prev) => [...prev, navButton[0]])
    }

    const removeMenuItems = async () => {
        for (let i = 0; i < menuItems.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, timeoffset))
            setMenuItems((prev) => prev.slice(0, -1))
        }
        setIsOpen(false)

    }

    return (
        <DropdownMenu
            open={isOpen}
            modal={false}
            onOpenChange={(newState) => {
                if (newState) {
                    addMenuItems()
                    setIsOpen(true)
                } else {
                    removeMenuItems()
                }
            }}
        >
            <DropdownMenuTrigger            >
                <NavButton isOpen={isOpen} />
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                sideOffset={12}
                style={{ width: menuWidth }}
                className="bg-red-600 rounded-none border-none overflow-y-auto"
            >
                {isOpen &&
                    menuItems.map((item, index) => (

                        < DropdownMenuItem
                            key={index}
                            className="p-0 ml-2 mr-3 mt-2 last:mb-10 focus:bg-transparent hover:bg-transparent"
                        >
                            {isLoggedIn && index === (menuItems.length - 1) ?
                                <button
                                    className={`${itemsClassname} cursor-pointer`}
                                    onClick={() => handleLogout()}
                                >
                                    <div
                                        className="flex items-center gap-2"
                                    >
                                        <FontAwesomeIcon
                                            icon={item.icon}
                                            className="text-current"
                                        />
                                        <span>{item.label}</span>
                                    </div>

                                    <FontAwesomeIcon
                                        icon={faPlay}
                                        className="text-sm text-yellow-600"
                                    />
                                </button>
                                :
                                <Link
                                    to={item.path}
                                    className={itemsClassname}
                                >
                                    <div
                                        className="flex items-center gap-2"
                                    >
                                        <FontAwesomeIcon
                                            icon={item.icon}
                                            className="text-current"
                                        />
                                        <span>{item.label}</span>
                                    </div>

                                    <FontAwesomeIcon
                                        icon={faPlay}
                                        className="text-sm text-yellow-600"
                                    />
                                </Link>
                            }
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>

        </DropdownMenu >
    );
};

export default NavDropDownMenu;