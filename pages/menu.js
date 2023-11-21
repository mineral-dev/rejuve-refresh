import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useRef, useState } from "react";
import Image from "next/image";
import BtnPrev from "@/components/BtnPrev";
import BtnNext from "@/components/BtnNext";
import { categories } from "@/data/categories";

export default function Menu() {
  const swiperRef = useRef();
  const [activeMenu, setActiveMenu] = useState(categories[0].slug);

  return (
    <main className="flex-grow bg-[#2C1438]">
      <section className="Category bg-primary-200 hidden lg:grid grid-cols-4 border-t-4 border-primary-600">
        <aside className="ParentCategory flex flex-col justify-between bg-primary-100">
          <div className="grid">
            {categories.map((item, key) => (
              <button
                onClick={() => setActiveMenu(item.slug)}
                key={key}
                className={`flex items-center justify-between text-black text-left h-14 px-8 ${
                  activeMenu === item.slug ? "bg-primary-200" : ""
                }`}
              >
                <span className="font-bold">{item.title}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="7.576"
                  height="12.324"
                  viewBox="0 0 7.576 12.324"
                >
                  <path
                    id="Path_16163"
                    data-name="Path 16163"
                    d="M0,0,1.583,1.583,4.748,4.748,9.5,0"
                    transform="translate(1.414 10.909) rotate(-90)"
                    fill="none"
                    stroke="#121212"
                    strokeLinecap="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            ))}
          </div>
          <button className="btn-secondary mx-4 mb-4">Show All</button>
        </aside>
        <main
          className={`col-span-3 min-h-[300px] grid gap-4 p-6 ${
            activeMenu === "discover" ? "grid-cols-4" : "grid-cols-4"
          }`}
        >
          {categories
            .filter((item) => item.slug === activeMenu)[0]
            ?.children.map((item, key) => (
              <button
                className={`bg-white rounded-lg transition ease-out-expo duration-500 hover:scale-105 hover:shadow-xl flex justify-center ${
                  activeMenu === "discover" ? "py-4" : "items-center px-2"
                }`}
              >
                <span
                  className={`${
                    activeMenu === "discover"
                      ? "grid place-items-center gap-y-6"
                      : "flex items-center space-x-4"
                  }`}
                >
                  <span className="font-bold flex items-center text-center">
                    {item.title}
                  </span>
                  <span className="flex items-center">{item.icon}</span>
                </span>
              </button>
            ))}
        </main>
      </section>
      <section className="MenuSwiper relative my-12">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1.35}
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
    </main>
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
