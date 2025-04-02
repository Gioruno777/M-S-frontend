import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useLocation } from "react-router-dom"

type Props = {
    menuTitle: {
        icon: IconDefinition;
        label: string;
    },
    menuItems: {
        name: string,
        site: string
    }[]
}

const SideBar = ({ menuTitle, menuItems }: Props) => {

    const location = useLocation()

    return (
        <aside className="shadow-lg">
            <h1 className="p-3 text-3xl text-white text-center bg-red-700 border-1 border-gray-100 rounded-t-md ">
                <FontAwesomeIcon icon={menuTitle.icon} /> {menuTitle.label}
            </h1>
            <ul className="text-xl bg-white border border-yellow-600 rounded-b-md ">
                {menuItems.map((items) =>
                    <li
                        key={items.name}
                        className="border-b border-dashed border-gray-400 last:border-none">
                        <a
                            href={items.site}
                            className={`group flex items-center justify-between w-full py-2 px-4 ${location.pathname.startsWith(items.site) ? "bg-red-100" : "bg-white"}`}
                        >
                            <span>{items.name}</span>
                            <span className="text-red-600 font-bold transform transition-transform duration-300 group-hover:translate-x-2">
                                {`>`}
                            </span>
                        </a>
                    </li>
                )}
            </ul>
        </aside >
    )
}

export default SideBar