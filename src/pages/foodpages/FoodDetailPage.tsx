import { useGetFoodDetail } from '@/api/foodApi'
import ErrorContainer from '@/components/container/ErrorContainer'
import MenuContainer from '@/components/container/MenuContainer'
import FoodDetailCard from '@/components/FoodDetailCard'
import Loading from '@/components/Loading'
import { faBurger, faSeedling, faWineGlass, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'


type titleType = {
    icon: IconDefinition;
    label: string;
    time: string
}

const FoodDetailPage = () => {
    const { foodId } = useParams()
    const { item, isLoading, isError } = useGetFoodDetail(foodId)

    const titleName: Record<string, titleType> = {
        "main": { icon: faBurger, label: " 主餐", time: "10:30 AM 後供應" },
        "side": { icon: faSeedling, label: " 附餐", time: "10:30 AM 後供應" },
        "beverage": { icon: faWineGlass, label: " 飲品", time: "全時段供應" }
    }

    if (isError && !item) {
        return (
            <ErrorContainer>
                ERROR😂😂😂
            </ErrorContainer>
        )
    }

    if (isLoading) return (
        <div className='flex-1 flex-justify-center items-center m-3'>
            <Loading />
        </div>
    )
    else return (
        < MenuContainer
            title={titleName[item.category]}
            productName={item.name}>
            <FoodDetailCard data={item} />
        </MenuContainer >
    )
}

export default FoodDetailPage