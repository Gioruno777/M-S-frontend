import MenuContainer from "@/components/container/MenuContainer"

const NutritionFactsPage = () => {
    const title = { label: "營養分析表" }

    return (
        <MenuContainer
            title={title}
        >
            <div className="p-2">
                <div className="border-10 border-white rounded-md">
                    <img
                        src="https://www.mos.com.tw/upload/webpage/20250206_144218_077.jpg"
                        alt="nutritionfacts"
                    />
                </div>
            </div>
        </MenuContainer>
    )
}

export default NutritionFactsPage