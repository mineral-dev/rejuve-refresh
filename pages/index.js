import Image from "next/image";
import Logo from "@/components/Logo";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRef, useState } from "react";
import BtnPrev from "@/components/BtnPrev";
import BtnNext from "@/components/BtnNext";
import HeaderHero from "@/components/HeaderHero";
import Banner from "@/components/Banner";

export default function Home() {
  const swiperRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <main>
      <HeaderHero
        description={`<h4>
            Re.fresh! by Re.juve is a forward-thinking smoothie bowl bar that
            seeks to redefine convenient meals for the urban populace.
          </h4>`}
      />

      <figure className="relative aspect-square lg:aspect-[16/5]">
        <Image
          src={`/img/home/hero.jpg`}
          fill
          style={{ objectFit: "cover" }}
          alt="Re.juve"
        />
      </figure>

      <section className="grid gap-y-8 py-12 xl:py-24">
        {introduction.map((item, key) => (
          <IntroSection key={key} index={key} data={item} />
        ))}
      </section>

      <Banner
        data={{
          bgColor: "bg-yellow",
          image: "/img/home/hero_cta.png",
        }}
      >
        <article
          dangerouslySetInnerHTML={{
            __html:
              "<h2>Easy and Nutritious</h2><p>Rooted in the mission to offer easy and nutritious solutions for the bustling city-dweller, Re.Fresh takes pride in the exceptional freshness and high quality ingredients.</p>",
          }}
          className="prose text-center lg:text-left"
        />

        <div className="flex space-x-4">
          {[
            {
              caption: "Shop Online",
              link: "/",
              type: "primary",
            },
            {
              caption: "Find In Stores",
              link: "/",
              type: "",
            },
          ].map((item, key) => (
            <Link
              key={key}
              href={item.link}
              className={key % 2 === 0 ? "btn-primary" : "btn-primary-outline"}
            >
              {item.caption}
            </Link>
          ))}
        </div>
      </Banner>

      <section className="bg-[#FFF7E5] py-12 xl:py-24">
        <div className="wrapper flex justify-center">
          <article
            dangerouslySetInnerHTML={{ __html: solution }}
            className="prose max-w-screen-md text-center"
          />
        </div>
      </section>

      <section className="bg-[#FCEADF] py-12 xl:py-24">
        <div className="wrapper">
          <article
            dangerouslySetInnerHTML={{ __html: favorite.title }}
            className="prose max-w-none text-center"
          ></article>
        </div>
        <div className="relative mt-12">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={50}
            slidesPerView={2}
            loop={true}
            centeredSlides={true}
            onSlideChange={(swiper) => {
              console.log(swiper);
              setCurrentIndex(swiper.realIndex);
            }}
          >
            {favorite.menu.map((item, key) => (
              <SwiperSlide key={key} className="!h-auto">
                <MenuThumb
                  data={item}
                  index={key}
                  currentIndex={currentIndex}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="pointer-events-none absolute z-10 -left-10 -top-1/4 -bottom-1/4 w-1/6 bg-gradient-to-r from-[#FCEADF] to-transparent"></div>
          <div className="pointer-events-none absolute z-10 -right-10 -top-1/4 -bottom-1/4 w-1/6 bg-gradient-to-l from-[#FCEADF] to-transparent"></div>
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
        <div className="flex justify-center mt-12">
          <Link href="/menu" className="btn-secondary">
            Check our menu
          </Link>
        </div>
      </section>
    </main>
  );
}

export function IntroSection({ index, data }) {
  return (
    <section
      className={`wrapper flex gap-8 xl:gap-16 ${
        index % 2 === 1 ? "flex-col lg:flex-row-reverse" : "flex-col lg:flex-row"
      }`}
    >
      <figure className="relative aspect-[4/5] lg:w-5/12">
        <Image
          src={data.image}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-xl"
          alt="Re.juve"
        />
      </figure>
      <div className="lg:w-7/12 flex items-center">
        <article
          dangerouslySetInnerHTML={{ __html: data.text }}
          className="prose"
        />
      </div>
    </section>
  );
}

export function MenuThumb({ data, index, currentIndex }) {
  const isActive = index === currentIndex;

  return (
    <section className="MenuThumb relative lg:!h-full flex items-center">
      <div
        className={`relative z-10 ${
          isActive ? "grid lg:grid-cols-2 gap-x-2" : ""
        }`}
      >
        <figure className="relative aspect-square">
          <Image src={data.image} width={600} height={600} alt="Re.juve" />
        </figure>
        {isActive && (
          <div className="flex flex-col items-center justify-center">
            <article
              dangerouslySetInnerHTML={{ __html: data.description }}
              className="prose prose-headings:text-primary-600 prose-p:text-sm text-center"
            ></article>
          </div>
        )}
      </div>

      {isActive && (
        <>
          <svg className="lg:hidden absolute z-0 top-0 left-1/2 -translate-x-1/2" xmlns="http://www.w3.org/2000/svg" width="231.001" height="261.801" viewBox="0 0 231.001 261.801">
            <path id="svgexport-14" d="M223.721,52.126C205.7,9.612,169.171.628,83.8.628,17.366.628,15.823,45.156,18.633,57.1c8.872,37.694,10.022,57.391-3.8,83.416C-13.46,193.77-2.28,252.448,57.039,257.459c97.088,8.2,106.926,6.279,142.436-5.934,20.456-7.035,37.553-44.279,24.245-69.946C192.115,120.621,250.578,115.487,223.721,52.126Z" transform="translate(0 -0.628)" fill="#f8d5c0"/>
          </svg>
          <svg
            className="hidden lg:block absolute z-0 top-0 h-full right-0"
            xmlns="http://www.w3.org/2000/svg"
            width="587.311"
            height="370.565"
            viewBox="0 0 587.311 370.565"
          >
            <path
              id="flavor-blob-d"
              d="M123.46,105.379C61.1,91.408-5.5,154.717.361,244.222c7.237,110.463,80.3,104.923,123.1,93s78.5-36.983,118.208-17.028c99.049,49.774,314.9,94.308,332.611-25.76C594.888,154.768,591.523,105.379,560.828,54.3S366.8-20.166,279.983,23.734C214.358,56.916,192.733,120.9,123.46,105.379Z"
              transform="translate(0 -0.628)"
              fill="#f8d5c0"
            />
          </svg>
        </>
        
      )}
    </section>
  );
}

const introduction = [
  {
    image: "/img/home/intro_one.jpg",
    text: "<h2>Freshness.</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent tristique magna sit amet purus. Adipiscing elit ut aliquam purus sit amet luctus venenatis.</p>",
  },
  {
    image: "/img/home/intro_two.jpg",
    text: "<h2>High Quality Ingredients.</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent tristique magna sit amet purus. Adipiscing elit ut aliquam purus sit amet luctus venenatis.</p>",
  },
];

const solution =
  "<h2>Solutions for The Bustling City-Dweller</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent tristique magna sit amet purus. Adipiscing elit ut aliquam purus sit amet luctus venenatis.</p><p>Condimentum mattis pellentesque id nibh tortor id aliquet lectus proin. Semper feugiat nibh sed pulvinar. Tempus quam pellentesque nec nam aliquam sem et.</p><p>Ut diam quam nulla porttitor. Integer eget aliquet nibh praesent tristique. Pulvinar proin gravida hendrerit lectus a. Et malesuada fames ac turpis egestas sed tempus. Tortor at risus viverra adipiscing at in. Et ultrices neque ornare aenean euismod elementum nisi quis. Quis viverra nibh cras pulvinar.</p>";

const favorite = {
  title: "<h2>Enjoy your favorite smoothies</h2>",
  menu: [
    {
      image: "/img/fav/bowl_one.png",
      description:
        "<h5>Classic Smoothies</h5><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent tristique magna sit amet purus. Adipiscing elit ut aliquam purus sit amet luctus venenatis.</p>",
    },
    {
      image: "/img/fav/bowl_two.png",
      description:
        "<h5>Classic Smoothies</h5><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent tristique magna sit amet purus. Adipiscing elit ut aliquam purus sit amet luctus venenatis.</p>",
    },
    {
      image: "/img/fav/bowl_three.png",
      description:
        "<h5>Classic Smoothies</h5><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent tristique magna sit amet purus. Adipiscing elit ut aliquam purus sit amet luctus venenatis.</p>",
    },
    {
      image: "/img/fav/bowl_one.png",
      description:
        "<h5>Classic Smoothies</h5><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent tristique magna sit amet purus. Adipiscing elit ut aliquam purus sit amet luctus venenatis.</p>",
    },
    {
      image: "/img/fav/bowl_two.png",
      description:
        "<h5>Classic Smoothies</h5><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent tristique magna sit amet purus. Adipiscing elit ut aliquam purus sit amet luctus venenatis.</p>",
    },
    {
      image: "/img/fav/bowl_three.png",
      description:
        "<h5>Classic Smoothies</h5><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent tristique magna sit amet purus. Adipiscing elit ut aliquam purus sit amet luctus venenatis.</p>",
    },
  ],
};
