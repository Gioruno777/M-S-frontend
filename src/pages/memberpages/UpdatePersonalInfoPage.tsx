import MemberContainer from "@/components/container/MemberContainer"
import UpdatePersonalInfoForm from "@/form/userforms/UpdatePersonalInfoForm"
import { faBurger } from "@fortawesome/free-solid-svg-icons"


const UpdatePersonalInfoPage = () => {
    const title = { icon: faBurger, label: "編輯個人資訊", }
    return (
        <MemberContainer title={title}>
            <UpdatePersonalInfoForm />
        </MemberContainer>
    )
}

export default UpdatePersonalInfoPage