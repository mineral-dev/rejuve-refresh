import ImageHandle from "@/components/ImageFill";
import SlideMenus from "@/components/SlideMenus";
import db from "@/db/db";
import { useGetCategoriesQuery, useGetFnbQuery } from "@/store/services/api";
import setAttachCategories from "@/utils/setAttchDbCategories";
import setAttachFnb from "@/utils/setAttchDbFnb";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import MetaSeo from "./MetaHead";

export default function MenuPage({ slug, seo: initSeo }) {
  const [seo, setSeo] = useState(initSeo);
  const [activeMenu, setActiveMenu] = useState({});
  const [categories, setCategories] = useState([]);
  const [fnbMenus, setFnbMenus] = useState([]);
  const [slideMenu, setSlideMenu] = useState([]);
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

  useEffect(() => {
    if (!errorCat && dataCat?.length > 0) {
      setCategories(dataCat);
      setActiveMenu(dataCat[0]);

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
    <main className="flex-grow bg-[url('/bg_menu.jpg')] flex flex-col">
      <MetaSeo data={seo} />

      <section className="CategoryMobile lg:hidden ">
        <div className="w-full bg-white overflow-x-scroll py-2 px-4">
          <div className="flex space-x-4 w-[5000px]">
            <section className="w-20">
              <div className="bg-primary-100 p-2 rounded-full">
                <figure className="aspect-square grid place-content-center">
                  <svg id="Group_3" data-name="Group 3" xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26">
                    <rect id="Rectangle_2" data-name="Rectangle 2" width="11" height="11" rx="4" fill="#ccbfdd"/>
                    <rect id="Rectangle_3" data-name="Rectangle 3" width="11" height="11" rx="4" transform="translate(0 15)" fill="#ccbfdd"/>
                    <rect id="Rectangle_4" data-name="Rectangle 4" width="11" height="11" rx="4" transform="translate(14 15)" fill="#ccbfdd"/>
                    <rect id="Rectangle_5" data-name="Rectangle 5" width="11" height="11" rx="5.5" transform="translate(14)" fill="#ccbfdd"/>
                  </svg>
                </figure>
              </div>
              <div className="text-center mt-2 text-sm sm:text-md">
                Lihat Semua
              </div>
            </section>
            {activeMenu?.attributes?.fnbMenus?.data &&
              activeMenu?.attributes?.fnbMenus?.data?.map((item, key) => (
                <section key={key} className="w-20">
                  <div className="bg-primary-100 border-2 border-transparent hover:border-primary-900 p-2 rounded-lg">
                    <figure
                      className={`relative aspect-square`}
                    >
                      {item?.attributes?.Icon?.data?.attributes && (
                        <ImageHandle
                          style={{ objectFit: "contain" }}
                          data={item.attributes?.Icon?.data?.attributes}
                          dbtable="categories"
                        />
                      )}
                    </figure>
                  </div>
                  <div className="text-center mt-2 text-sm sm:text-md">
                    {item.attributes?.Title}
                  </div>
                </section>
              ))
            }
          </div>
        </div>
      </section>


      <section className="CategoryDesktop bg-primary-200 hidden lg:grid grid-cols-4 border-t-4 border-primary-600">
        <aside className="ParentCategory flex flex-col justify-between bg-primary-100">
          <div className="grid">
            {categories.map((item, key) => (
              <button
                onClick={() => setActiveMenu(item)}
                key={key}
                className={`flex items-center justify-between text-black text-left h-14 px-8 transition duration-500 hover:bg-primary-200 ${
                  slug === item.attributes?.Slug ? "bg-primary-200" : ""
                }`}
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
                      <ImageHandle
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


      {slideMenu.length > 0 ? (
        <SlideMenus data={slideMenu} imageDb="fnb" />
      ) : (
        <section className="flex-grow flex justify-center items-center h-80 my-24 w-auto">
          <div className="flex flex-col space-y-4 items-center">
            <span className="text-white font-bold">We are preparing something new. Stay Tune.</span>
            <Link className="btn-white-outline mx-4 mb-4" href="/menu">
              Show All
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
