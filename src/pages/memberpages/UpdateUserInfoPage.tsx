import MemberContainer from "@/components/container/MemberContainer"
import UpdateUserInfoForm from "@/form/userforms/UpdatePersonalInfoForm"
import { faBurger } from "@fortawesome/free-solid-svg-icons"


const UpdateUserInfoPage = () => {
    const title = { icon: faBurger, label: "編輯個人資訊", }
    return (
        <MemberContainer title={title}>
            <div className="flex h-full flex-col justify-center items-center">
                <div className='w-2/3 p-4 my-8 shadow-lg '>
                    <div className="text-lg font-bold text-center md:text-2xl ">
                        編輯會員資訊
                    </div>
                    <UpdateUserInfoForm />
                </div>
            </div>
        </MemberContainer>
    )
}

export default UpdateUserInfoPage