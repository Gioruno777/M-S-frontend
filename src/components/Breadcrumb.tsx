import { Link, useLocation } from "react-router-dom"

type Props = {
    urlName: Record<string, string[]>
    productName?: string
}

const Breadcrumb = ({ urlName, productName }: Props) => {
    const location = useLocation()
    const pathSegments = location.pathname.split("/").filter(Boolean)
    const threshold = pathSegments.length - 1


    return (
        <div>
            <Link to="/">首頁</Link>
            {
                pathSegments.map((segment, index) => (
                    segment in urlName ? (
                        index < threshold && urlName[segment].length == 2 ?
                            <Link
                                key={segment}
                                to={urlName[segment][1]}
                            >
                                {` > ` + urlName[segment][0]}
                            </Link>
                            :
                            < span key={segment}
                            >
                                {` > ` + urlName[segment][0]}
                            </span>
                    ) : (
                        <span key={productName}>{` > ` + productName}</span>
                    )
                ))
            }
        </div>
    )
}

export default Breadcrumb