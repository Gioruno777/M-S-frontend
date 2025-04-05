import { faCrown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import Breadcrumb from '../Breadcrumb';
import SideBar from '../SideBar';
import Title from '../Title';
type Props = {
    title: {
        icon?: IconDefinition;
        label: string;
        time?: string
    }
    children: React.ReactNode
}

const MemberContainer = ({ title, children }: Props) => {

    const menuTitle = { icon: faCrown, label: "會員專區" }

    const menuItems = [
        { name: "會員資訊", site: "/member/main" },
        { name: "歷史訂單", site: "/member/purchasedetail" },
        { name: "交易明細", site: "/member/123" },
        { name: "更改密碼", site: "/member/updatepassword" },
        { name: "編輯會員資訊", site: "/member/updateuserinfo" }
    ]

    const urlName: Record<string, string[]> = {
        "member": ["會員專區", "/member/main"],
        "main": ["會員資訊", "/menu/main"],
        "side": ["歷史訂單", "/menu/side"],
        "purchasedetail": ["歷史訂單", "/member/purchasedetail"],
        "updatepassword": ["更改密碼", "/member/updatepassword"],
        "updateuserinfo": ["編輯會員資訊", "/member/updateuserinfo"],
    }
    return (
        <div className="container mx-auto" >

            <div className=" flex flex-col h-full p-4 pt-4 space-y-4 ">
                <Breadcrumb urlName={urlName} />
                <div className="md:hidden ">
                    <SideBar menuTitle={menuTitle} menuItems={menuItems} />
                </div>

                <div className="flex-1 grid grid-cols-10 w-full md:gap-4">

                    <div className="hidden md:block md:col-span-2 ">
                        <SideBar menuTitle={menuTitle} menuItems={menuItems} />
                    </div>
                    <div className="flex flex-col col-span-10 space-y-4 md:col-span-8">
                        <Title title={title} />
                        <div className='flex-1  m-3 bg-white rounded-md shadow-2xl'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberContainer