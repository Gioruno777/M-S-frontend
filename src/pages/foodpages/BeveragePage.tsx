import { useGetAllFood } from '@/api/foodApi'
import MenuContainer from '@/components/container/MenuContainer'
import FoodCard from '@/components/FoodCard'
import SearchBar from '@/components/SearchBar'
import SortDropdown from '@/components/SortDropdown'
import { faWineGlass } from '@fortawesome/free-solid-svg-icons'
import { foodType } from "@/types";
import { useState } from 'react'
import Loading from '@/components/Loading'

const BeveragePage = () => {
    const title = { icon: faWineGlass, label: " 飲品", time: "全時段供應" }

    const [sortBy, setsortBy] = useState("-_id")
    const { items, isLoading } = useGetAllFood(sortBy, "beverage")

    const handlesortBy = (sortField: string) => {
        if (sortBy !== sortField) {
            setsortBy(sortField);
        }
    }


    return (
        <MenuContainer title={title}>
            {
                isLoading ?
                    <div className='flex-1 flex-justify items-center m-3'>
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

export default BeveragePage