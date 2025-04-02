import { useSearchFood } from "@/api/foodApi"
import MenuContainer from "@/components/container/MenuContainer"
import FoodCard from "@/components/FoodCard"
import Loading from "@/components/Loading"
import SearchBar from "@/components/SearchBar"
import SortDropdown from "@/components/SortDropdown"
import { foodType } from "@/types"
import { faBurger } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useLocation } from "react-router-dom"

const SearchBurgerPage = () => {
    const title = { icon: faBurger, label: " 主餐", time: "10:30 AM 後供應" }
    const [sortBy, setsortBy] = useState("-_id")

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const keyword = searchParams.get('keyword') || ""

    const { items, isLoading, isError } = useSearchFood(sortBy, "main", keyword)

    const handlesortBy = (sortField: string) => {
        if (sortBy !== sortField) {
            setsortBy(sortField);
        }
    }

    return (
        <MenuContainer title={title}>
            <div className="grid grid-cols-10 w-full mb-2">
                <div className="col-span-8 p-2 ">
                    <SearchBar searchQuery={keyword} />
                </div>
                <div className="col-span-2 flex justify-end">
                    <SortDropdown onClick={handlesortBy} />
                </div>
            </div>
            {isLoading ? (
                <div className='flex-1 flex justify-center items-center m-3'>
                    <Loading />
                </div>
            ) : isError ? (

                <div className='flex-1 flex justify-center items-center m-3'>
                    <p>發生錯誤，無法加載資料。</p>
                </div>
            ) : (
                <>
                    {items.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-4">
                            {items.map((food: foodType) => (
                                <FoodCard food={food} key={food._id} />
                            ))}
                        </div>
                    ) : (
                        <div className='flex-1 flex justify-center items-center m-3'>
                            無相符的搜尋結果
                        </div>
                    )}
                </>
            )}
        </MenuContainer >
    )
}

export default SearchBurgerPage