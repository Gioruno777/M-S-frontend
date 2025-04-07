import { faBurger, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Title from "../Title";
import SideBar from "../SideBar";
import Breadcrumb from "../Breadcrumb";

type Props = {
    children: React.ReactNode
    title: {
        icon?: IconDefinition;
        label: string;
        time?: string
    }
    productName?: string
}

const MenuContainer = ({ title, children, productName }: Props) => {
    const menuTitle = { icon: faBurger, label: "美味專區" }

    const urlName: Record<string, string[]> = {
        "menu": ["美味專區", "/menu/main"],
        "main": ["主餐", "/menu/main"],
        "side": ["附餐", "/menu/side"],
        "beverage": ["飲品", "/menu/beverage"],
        "nutritionfacts": ["商品營養分析表"],
        "search": ["搜尋結果"]
    }

    const menuItems = [
        { name: "主餐", site: "/menu/main" },
        { name: "附餐", site: "/menu/side" },
        { name: "飲品", site: "/menu/beverage" },
        { name: "商品營養分析表", site: "/menu/nutritionfacts" }
    ]
    return (
        <div className="container mx-auto" >
            <div className="flex flex-col h-full p-4 pt-4 space-y-4 ">
                <Breadcrumb urlName={urlName} note={productName} />
                <div className="md:hidden ">
                    <SideBar menuTitle={menuTitle} menuItems={menuItems} />
                </div>
                <div className="flex-1 grid grid-cols-10 w-full md:gap-4">

                    <div className="hidden md:block md:col-span-2 ">
                        <SideBar menuTitle={menuTitle} menuItems={menuItems} />
                    </div>
                    <div className="flex flex-col col-span-10 space-y-4 md:col-span-8">
                        <Title title={title} />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuContainer