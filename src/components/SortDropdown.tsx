
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
type Props = {
    onClick: (sortField: string) => void
}
const SortDropdown = ({ onClick }: Props) => {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger
                className='mt-8 text-lg'
            >
                ▼排序
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
            >
                <DropdownMenuItem
                    onClick={() => onClick("-_id")}
                >
                    綜合
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => onClick("-price")}
                >
                    價格:由高到低
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => onClick("price")}
                >
                    價格:由低到高
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => onClick("-calories")}
                >
                    卡路里:由高到低
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => onClick("calories")}
                >
                    卡路里:由低到高
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default SortDropdown