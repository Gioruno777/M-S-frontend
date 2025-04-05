import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "../styles/swiper.css"
import { Link } from "react-router-dom"

const HomePage = () => {
    const imgList = [
        { image: "https://res.cloudinary.com/ddamsnyat/image/upload/v1742807977/photo/user_70b58e29-52c1-4abe-8986-ce630340d035.jpg", site: "/menu/main" },
        { image: "https://res.cloudinary.com/ddamsnyat/image/upload/v1742807977/photo/user_70b58e29-52c1-4abe-8986-ce630340d035.jpg", site: "/menu/main" },
        { image: "https://res.cloudinary.com/ddamsnyat/image/upload/v1742807977/photo/user_70b58e29-52c1-4abe-8986-ce630340d035.jpg", site: "/menu/main" },
        { image: "https://res.cloudinary.com/ddamsnyat/image/upload/v1742807977/photo/user_70b58e29-52c1-4abe-8986-ce630340d035.jpg" },
        { image: "https://res.cloudinary.com/ddamsnyat/image/upload/v1742807977/photo/user_70b58e29-52c1-4abe-8986-ce630340d035.jpg" }

    ]

    return (
        <div className="w-full" >
            <div >
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={10}
                    slidesPerView={1.2}
                    centeredSlides={true}
                    navigation
                    pagination={{
                        el: ".custom-pagination",
                        clickable: true,
                    }}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                >
                    {imgList.map((img, i) => (
                        <SwiperSlide key={i} className="flex justify-centers items-centers">
                            {img.site ? (
                                <Link to={img.site}>
                                    <img src={img.image} alt={`Slide ${i + 1}`} className="w-full h-40 object-cover rounded md:h-160" />
                                </Link>
                            ) : (
                                <img src={img.image} alt={`Slide ${i + 1}`} className="w-full h-40  object-cover rounded md:h-160" />
                            )}
                        </SwiperSlide>
                    ))}

                    <div className="custom-pagination flex justify-center gap-10 my-8 md:gap-30"></div>


                </Swiper >
            </div>
        </div >
    )

}

export default HomePage