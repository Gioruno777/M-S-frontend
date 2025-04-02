type Props = {
    isOpen: boolean
}

const NavButton = ({ isOpen }: Props) => {

    return (
        <div
            className="w-12 h-12 p-2 flex flex-col justify-center items-center space-y-1 bg-red-600 rounded-md  "
        >
            <div
                className={`w-9 h-1 bg-white rounded transition-transform duration-300 origin-center ${isOpen ? "rotate-45 translate-y-2" : ""}`}
            >
            </div>
            <div
                className={`w-9 h-1 bg-white rounded transition-all duration-300 ${isOpen ? "opacity-0 scale-x-0" : ""}`}
            ></div>
            <div
                className={`w-9 h-1 bg-white rounded transition-transform duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></div>
        </div>
    )
}

export default NavButton