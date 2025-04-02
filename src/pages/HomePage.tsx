import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "../styles/swiper.css"
import { Link } from "react-router-dom"

const HomePage = () => {
    const imgList = [
        { image: "https://res.cloudinary.com/ddamsnyat/image/upload/v1742807977/photo/user_70b58e29-52c1-4abe-8986-ce630340d035.jpg", site: "/menu/main" },
        { image: "https://scontent.ftpe8-1.fna.fbcdn.net/v/t1.6435-9/100683979_10157460768585662_2839371075152773120_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=RgFBOcP4_hkQ7kNvgGW8Tqs&_nc_oc=Adh4TuJS0TauDYP7Z6pkUnwifAJWUrvg363NF2m7-bJRFi6pqDcogps8ZnkqCxmbwsQ&_nc_zt=23&_nc_ht=scontent.ftpe8-1.fna&_nc_gid=Ap3fW4BIVUGPzdWsqY3jt5x&oh=00_AYC5ziJQBgY56q_w97l4RNQq4rnBTMyBQDdRzaGp0jth5A&oe=67F0D03B", site: "/menu/main" },
        { image: "https://scontent.ftpe8-1.fna.fbcdn.net/v/t1.6435-9/100683979_10157460768585662_2839371075152773120_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=RgFBOcP4_hkQ7kNvgGW8Tqs&_nc_oc=Adh4TuJS0TauDYP7Z6pkUnwifAJWUrvg363NF2m7-bJRFi6pqDcogps8ZnkqCxmbwsQ&_nc_zt=23&_nc_ht=scontent.ftpe8-1.fna&_nc_gid=Ap3fW4BIVUGPzdWsqY3jt5x&oh=00_AYC5ziJQBgY56q_w97l4RNQq4rnBTMyBQDdRzaGp0jth5A&oe=67F0D03B", site: "/menu/main" },
        { image: "https://scontent.ftpe8-1.fna.fbcdn.net/v/t1.6435-9/100683979_10157460768585662_2839371075152773120_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=RgFBOcP4_hkQ7kNvgGW8Tqs&_nc_oc=Adh4TuJS0TauDYP7Z6pkUnwifAJWUrvg363NF2m7-bJRFi6pqDcogps8ZnkqCxmbwsQ&_nc_zt=23&_nc_ht=scontent.ftpe8-1.fna&_nc_gid=Ap3fW4BIVUGPzdWsqY3jt5x&oh=00_AYC5ziJQBgY56q_w97l4RNQq4rnBTMyBQDdRzaGp0jth5A&oe=67F0D03B" },
        { image: "https://scontent.ftpe8-1.fna.fbcdn.net/v/t1.6435-9/100683979_10157460768585662_2839371075152773120_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=RgFBOcP4_hkQ7kNvgGW8Tqs&_nc_oc=Adh4TuJS0TauDYP7Z6pkUnwifAJWUrvg363NF2m7-bJRFi6pqDcogps8ZnkqCxmbwsQ&_nc_zt=23&_nc_ht=scontent.ftpe8-1.fna&_nc_gid=Ap3fW4BIVUGPzdWsqY3jt5x&oh=00_AYC5ziJQBgY56q_w97l4RNQq4rnBTMyBQDdRzaGp0jth5A&oe=67F0D03B" }

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