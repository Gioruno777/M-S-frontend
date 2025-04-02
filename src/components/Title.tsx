import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
type Props = {
    title: {
        icon?: IconDefinition;
        label: string;
        time?: string
    }

}

const Title = ({ title }: Props) => {
    return (
        <div className="p-3 bg-white border-8 border-[#f9eac7] rounded-md shadow-lg">
            <div className=" flex justify-between text-[#c39b4e]">
                <span className="text-xl font-semibold">
                    {title.icon && <FontAwesomeIcon icon={title.icon} />}
                    {title.label}
                </span>

                {title.time && <span className="font-normal">{title.time}</span>}

            </div>
        </div>
    )
}

export default Title