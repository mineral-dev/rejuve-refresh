import { useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import 'swiper/css/zoom';
import { EffectCoverflow, Pagination, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BtnNext from "./BtnNext";
import BtnPrev from "./BtnPrev";
import ImageWidth from "./ImageWidth";

export default function SlideMenus({ data, imageDb }) {
  const swiperRef = useRef();

  // useEffect(() => {
  //   if (swiperRef?.current) {
  //     swiperRef.current?.autoplay?.start() 
  //   }
  // }, [data])

  // console.log(data)
  return (
    <section className="MenuSwiper w-full flex-grow  flex items-center">
      <div className="relative w-full h-full">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        effect={"coverflow"}
        centeredSlides={true}
        centerInsufficientSlides={true}
        modules={[EffectCoverflow, Pagination, Zoom]}
        breakpoints={{
          0: {
            slidesPerView: 1.2,
            grabCursor: true,
            coverflowEffect: {
              rotate: 70,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }
          },
          719: {
            slidesPerView: 1.3,
            grabCursor: true,
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }
          },
          1023: {
            slidesPerView: 2.2,
            grabCursor: false,
            coverflowEffect: {
              rotate: 70,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }
          },
          1279: {
            slidesPerView: 3,
            grabCursor: false,
            coverflowEffect: {
              rotate: 70,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }
          },
        }}
        zoom={true}
      >
        {data?.map((item, key) => (
          <SwiperSlide key={key}>
            <figure className="swiper-zoom-container relative w-full flex items-center justify-center md:py-12">
              {item?.Image && <ImageWidth data={item.Image} dbtable={imageDb} />}
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
      </div>
      
    </section>
  );
}