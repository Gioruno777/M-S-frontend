import { useGetAllFood } from '@/api/foodApi'
import MenuContainer from '@/components/container/MenuContainer'
import FoodCard from '@/components/FoodCard'
import Loading from '@/components/Loading'
import SearchBar from '@/components/SearchBar'
import SortDropdown from '@/components/SortDropdown'
import { foodType } from '@/types'
import { faBurger } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const BurgerPage = () => {
    const title = { icon: faBurger, label: " 主餐", time: "10:30 AM 後供應" }

    const [sortBy, setsortBy] = useState("-_id")
    const { items, isLoading } = useGetAllFood(sortBy, "main")

    const handlesortBy = (sortField: string) => {
        if (sortBy !== sortField) {
            setsortBy(sortField);
        }
    }

    return (
        <MenuContainer title={title}>
            {
                isLoading ?
                    <div className='flex-1 flex-justify-center items-center m-3'>
                        <Loading />
                    </div>
                    :
                    <>
                        <div className="grid grid-cols-10 w-full mb-2">
                            <div className="col-span-8 p-2 ">
                                <SearchBar />
                            </div>
                            <div className="col-span-2 flex justify-end">
                                <SortDropdown onClick={handlesortBy} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-4">
                            {items.map((item: foodType) => (
                                <FoodCard food={item} key={item._id} />
                            ))}
                        </div>
                    </>
            }
        </MenuContainer>
    )
}

export default BurgerPage