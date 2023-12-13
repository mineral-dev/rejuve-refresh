import { useRef } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BtnNext from "./BtnNext";
import BtnPrev from "./BtnPrev";
import ImageWidth from "./ImageWidth";

export default function SlideMenus({ data, imageDb }) {
  const swiperRef = useRef();

  // useEffect(() => {
  //    swiperRef.current?.autoplay.start()
  // }, [data])

  return (
    <section className="MenuSwiper flex-grow relative flex items-center pb-10 sm:pb-0 md:py-8">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        // pagination={true}
        modules={[EffectCoverflow, Pagination]}
        breakpoints={{
          0: {
            slidesPerView: 1.7
          },
          640: {
            slidesPerView: 1.2
          },
          1280: {
            slidesPerView: 2.8
          }
        }}
      >
        {data?.map((item, key) => (
          <SwiperSlide key={key}>
            <figure className="relative w-full flex items-center justify-center">
              {item.Image && <ImageWidth data={item.Image} dbtable={imageDb} />}
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        onClick={() => swiperRef?.current?.slidePrev()}
        className="btn-swiper prev"
      >
        <BtnPrev />
      </button>
      <button
        onClick={() => swiperRef?.current?.slideNext()}
        className="btn-swiper next"
      >
        <BtnNext />
      </button>
    </section>
  );
}

const sliderMenu = [
  {
    image: "/img/menu/menu_one.jpg",
  },
  {
    image: "/img/menu/menu_one.jpg",
  },
  {
    image: "/img/menu/menu_one.jpg",
  },
  {
    image: "/img/menu/menu_one.jpg",
  },
  {
    image: "/img/menu/menu_one.jpg",
  },
];
