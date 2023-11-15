import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { useRef } from "react";
import Image from "next/image";
import BtnPrev from "@/components/BtnPrev";
import BtnNext from "@/components/BtnNext";

export default function Menu() {
    const swiperRef = useRef();

    return (
        <section className="bg-[#2C1438] py-12">
            <div className="wrapper">
                <section className="Categories flex space-x-2">
                   {
                    categories.map((item, key) => (
                        <button key={key} className="btn-natural">
                            {item.caption}
                        </button>
                    ))
                   }
                </section>
            </div>
            <section className="MenuSwiper relative mt-12">
                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    slidesPerView={1.3}
                    
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination]}
                >
                    {sliderMenu.map((item, key) => (
                    <SwiperSlide key={key}>
                        <figure className="relative">
                            <Image
                            src={item.image}
                            width={1000}
                            height={1000}
                            className="w-full rounded-xl"
                            alt="Re.juve"
                            />
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
        </section>
    )
}

const categories = [
    {
        icon: "",
        caption: "Promotion Menu",
        value: "promotion"
    },
    {
        icon: "",
        caption: "True Smoothies Drink",
        value: "drink"
    },
    {
        icon: "",
        caption: "True Smoothies Bowl",
        value: "bowl"
    },
    {
        icon: "",
        caption: "Re.Fresh Food",
        value: "food"
    }
]

const sliderMenu = [
    {
        image: "/img/menu/menu_one.jpg"
    },
    {
        image: "/img/menu/menu_one.jpg"
    },
    {
        image: "/img/menu/menu_one.jpg"
    },
    {
        image: "/img/menu/menu_one.jpg"
    },
    {
        image: "/img/menu/menu_one.jpg"
    }
]