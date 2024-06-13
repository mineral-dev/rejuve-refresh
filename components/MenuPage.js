import ImageFill from "@/components/ImageFill";
import SlideMenus from "@/components/SlideMenus";
import db from "@/db/db";
import { useGetCategoriesQuery, useGetFnbQuery } from "@/store/services/api";
import setAttachCategories from "@/utils/setAttchDbCategories";
import setAttachFnb from "@/utils/setAttchDbFnb";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/scss/mousewheel"
import MetaSeo from "./MetaHead";
import ImageWidth from "./ImageWidth";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules"
import Menus from "./Menus";


export default function MenuPage({ slug, seo: initSeo }) {
  const swiperRef = useRef();
  const [seo, setSeo] = useState(initSeo);
  const [activeMenu, setActiveMenu] = useState({});
  const [categories, setCategories] = useState([]);
  const [fnbMenus, setFnbMenus] = useState([]);
  const [slideMenu, setSlideMenu] = useState([]);
  const [slideMenuMobile, setSlideMenuMobile] = useState([]);
  const {
    data: dataCat,
    isError: isErrorCat,
    error: errorCat,
  } = useGetCategoriesQuery();
  const {
    data: dataFnb,
    isError: isErrorFnb,
    error: errorFnb,
  } = useGetFnbQuery();

  const handleMenuCatMobile = (data) => {
    let menuMobile = []
    data.map((item)=> {
      item.attributes?.fnbMenus?.data?.map((menu)=> {
        menuMobile.push(menu)
      })
    })
    setSlideMenuMobile(menuMobile)
  }

  useEffect(() => {
    if (!errorCat && dataCat?.length > 0) {
      setCategories(dataCat);
      setActiveMenu(dataCat[0]);
      handleMenuCatMobile(dataCat)

      db.get("categories").catch(async (e) => {
        const body = {
          _id: "categories",
          data: dataCat,
          _attachments: await setAttachCategories(dataCat),
        };
        db.put(body).catch((e) => console.warn(e));
      });
    } else {
      db.get("categories")
        .then(function (doc) {
          setCategories(doc?.data);
          setActiveMenu(doc?.data[0]);
          handleMenuCatMobile(doc?.data)
        })
        .catch((e) => console.warn(e));
    }
  }, [dataCat, errorCat, isErrorCat]);

  useEffect(() => {
    if (!errorFnb && dataFnb?.length > 0) {
      setFnbMenus(dataFnb);
      db.get("fnb").catch(async (e) => {
        const body = {
          _id: "fnb",
          data: dataFnb,
          _attachments: await setAttachFnb(dataFnb),
        };
        db.put(body).catch((e) => console.warn(e));
      });
    } else {
      db.get("fnb")
        .then(function (doc) {
          setFnbMenus(doc?.data);
        })
        .catch((e) => console.warn(e));
    }
  }, [dataFnb, errorFnb, isErrorFnb]);

  useEffect(() => {
    if (fnbMenus?.length > 0) {
      const result = fnbMenus.filter((item) => item.Slug === slug);
      if (result?.length > 0) {
        setSlideMenu(result);
        console.log(result,'result')
        setSeo(result[0]?.Seo);
      } else {
        setSlideMenu([]);
      }
    }

    if (slug === "all") {
      setSlideMenu(fnbMenus);
    }
  }, [fnbMenus, slug]);

  return (
    <main className="flex-grow bg-orange flex flex-col">
      <MetaSeo data={seo} />

      <section className="CategoryMobile bg-white pt-3 sm:pt-4 lg:hidden">
        <Swiper            
          onSwiper={(swiper) => (swiperRef.current = swiper)}        
          modules={[Mousewheel, FreeMode]} 
          direction="horizontal"
          mousewheel={{
            forceToAxis: true,
          }}
          freeMode
          breakpoints={{
            0: {
              slidesPerView: 2.5
            },
            414: {
              slidesPerView: 2.7
            },
            719: {
              slidesPerView: 4.8
            }
          }}
          spaceBetween={16}
          slidesOffsetBefore={16}
          slidesOffsetAfter={32}
        >
          {slideMenuMobile?.map((item, key) => (
            <SwiperSlide key={key}>
              <Link href={item?.attributes?.Slug ? `/menu/${item?.attributes?.Slug}` : '#'} key={key}>
                <div className="bg-primary-100 border-2 border-transparent hover:border-primary-900 py-1 rounded-lg">
                  <figure
                    className={`relative h-10 grid place-items-center mx-auto`}
                  >
                    {item?.attributes?.Icon?.data?.attributes && (
                      <ImageFill
                        style={{ objectFit: "contain" }}
                        data={item.attributes?.Icon?.data?.attributes}
                        dbtable="categories"
                      />
                    )}
                  </figure>
                </div>
                <div className="text-center font-bold mt-2 text-xs">
                  {item.attributes?.Title}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="CategoryDesktop bg-slate-200 hidden lg:grid grid-cols-4 border-t border-slate-300/50">
        <aside className="ParentCategory flex flex-col justify-between bg-white -mt-px">
          <div className="grid">
            {categories.map((item, key) => (
              <button
                onClick={() => setActiveMenu(item)}
                key={key}
                className={`flex items-center justify-between text-black text-left h-14 px-8 transition duration-500 hover:bg-slate-200 
                ${ activeMenu.attributes.Slug === item.attributes?.Slug ? "bg-slate-200 border-y border-slate-300/50" : "" }`}
              >
                <span className="font-bold">{item.attributes?.Title}</span>
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
          <Link href="/menu" className="btn-primary-outline mx-4 mb-4">
            Show All
          </Link>
        </aside>
        <main className={`col-span-3 min-h-[270px] grid gap-4 p-6 grid-cols-4`}>
          {activeMenu?.attributes?.fnbMenus?.data &&
            activeMenu?.attributes?.fnbMenus?.data?.map((item, key) => (
              <Link
                key={key}
                className={`bg-white rounded-lg transition ease-out-expo duration-500 xl:hover:scale-105 xl:hover:shadow-xl flex justify-center ${
                  activeMenu.attributes?.Template === "Discover"
                    ? "py-4 px-2"
                    : "items-center px-4"
                }`}
                href={
                  item.attributes.Slug
                    ? `/menu/${item.attributes.Slug}`
                    : "/menu"
                }
              >
                <span
                  className={`w-full h-full ${
                    activeMenu.attributes?.Template === "Discover"
                      ? "flex flex-col items-center space-y-6"
                      : "flex items-center justify-between"
                  }`}
                >
                  <span
                    className={`font-bold text-black text-left ${
                      activeMenu.attributes?.Template === "Discover"
                        ? ""
                        : "flex-grow"
                    }`}
                  >
                    {item.attributes?.Title}
                  </span>
                  {item?.attributes?.Icon?.data?.attributes && (
                    <figure
                      className={`relative w-full flex items-center ${
                        activeMenu.attributes?.Template === "Discover"
                          ? "aspect-video"
                          : "aspect-video flex justify-end"
                      }`}
                    >
                      <ImageFill
                        style={{ objectFit: "contain" }}
                        data={item.attributes?.Icon?.data?.attributes}
                        dbtable="categories"
                      />
                    </figure>
                  )}
                </span>
              </Link>
            ))}
        </main>
      </section>

      <Menus data={slideMenu} />
    </main>
  );
}

// <ImageWidth data={slideMenu.Image} dbtable="fnb" />