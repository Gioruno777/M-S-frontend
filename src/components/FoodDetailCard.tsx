import { foodType } from "@/types"

type Props = {
    data: foodType
}

const FoodDetailCard = ({ data }: Props) => {
    const { image,
        name,
        description,
        calories,
        protein,
        fat,
        saturatedFat,
        transFat,
        carbohydrates,
        sodium,
        limited,
        seasonal
    } = data

    const nutrition = [
        ["熱量", calories + " Kcal"],
        ["蛋白質", protein + " g"],
        ["脂肪", fat + " g"],
        ["飽和脂肪", saturatedFat + " g"],
        ["反式脂肪", transFat + " g"],
        ["碳水化合物", carbohydrates + " g"],
        ["鈉", sodium + " mg"],
    ]

    return (
        <div className=" w-full bg-white rounded-md  shadow-lg md:grid grid-cols-10">

            <div className="px-5 md:col-span-5 ">
                <img src={image} className="w-full" />
            </div>

            <div className=" flex-col space-y-4 px-5 pb-4 bg-white md:col-span-5">
                <h1 className="mt-5 text-2xl"
                >
                    {name}
                </h1>
                <p className="text-lg">{description}</p>

                <div className="min-h-[20px] w-full flex space-x-8 p-2 mb-2 bg-[#F8F3E9] rounded-md "
                >
                    {seasonal &&
                        <div className="flex space-x-1 items-center space-x-2">
                            <span
                                className="w-8 h-8 flex items-center justify-center text-2xl font-bold text-red-500 bg-white border-2 border-red-500 rounded-full"
                            >
                                季
                            </span>
                            <span
                                className="flex items-center justify-center text-lg"
                            >
                                季節限定
                            </span>
                        </div>
                    }

                    {limited &&
                        <div className="flex items-center space-x-2">
                            <span
                                className="w-8 h-8 flex flex-col items-center justify-center text-xs font-normal leading-tight text-white bg-blue-600 border-2 border-blue-600 rounded-md"
                            >限量<br />供應
                            </span>
                            <span
                                className="flex items-center justify-center text-lg"
                            >
                                限量供應
                            </span>
                        </div>
                    }
                </div>


                <table
                    className="w-full border border-blue-100"
                >
                    <thead>
                        <tr className=" bg-blue-100">
                            <th colSpan={2} className="p-2 px-6 text-left text-base font-bold">
                                單份{name}營養標示
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {nutrition.map((data, index) => (
                            <tr key={index} className={index % 2 === 1 ? "bg-[#F8F3E9]" : "bg-white"}>
                                <td className="p-2 px-6 text-left">{data[0]}</td>
                                <td className="p-2 px-6 text-left">{data[1]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div >
    )
}

export default FoodDetailCard