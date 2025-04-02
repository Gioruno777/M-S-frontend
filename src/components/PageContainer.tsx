import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Title from "./Title"

type Props = {
    children: React.ReactNode
    title: {
        icon?: IconDefinition;
        label: string;
        time?: string
    }
}

const PageContainer = ({ title, children }: Props) => {

    return (
        <div className="container mx-auto" >
            <div className='flex flex-col pt-3 gap-6 h-full '>
                <Title title={title} />
                <div className='flex-1  m-3 bg-gray-200 rounded-md shadow-lg'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default PageContainer