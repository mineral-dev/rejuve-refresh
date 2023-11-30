import ImageHandle from "@/components/ImageFill";
import SlideMenus from "@/components/SlideMenus";
import db from "@/db/db";
import { useGetCategoriesQuery, useGetFnbQuery } from "@/store/services/api";
import setAttachFnb from "@/utils/setAttchDbFnb";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function Menu() {
  const swiperRef = useRef();
  const [activeMenu, setActiveMenu] = useState({});
  const [activeMenuChildern, setActiveMenuChildern] = useState({});
  const [categories, setCategories] = useState([])
  const [fnbMenus, setFnbMenus] = useState([])
  const [slideMenu, setSlideMenu] = useState([])
  const { data: dataCat, isError: isErrorCat, error: errorCat } = useGetCategoriesQuery()
  const { data: dataFnb, isError: isErrorFnb, error: errorFnb } = useGetFnbQuery()

  useEffect(()=> {
    if (!errorCat && dataCat?.length > 0) {
      setCategories(dataCat)
      setActiveMenu(dataCat[0])
      setActiveMenuChildern(dataCat[0]?.attributes?.fnbMenus?.data[0])
      db.get('categories').catch(async (e)=>{
        const body = {
          _id: 'categories',
          data: dataCat,
        }
        db.put(body).catch((e)=>console.warn(e))
      });
    }else{
      db.get('categories').then(function(doc) {
        setCategories(doc?.data)
        setActiveMenu(doc?.data[0])
        setActiveMenuChildern(doc?.data[0]?.attributes?.fnbMenus?.data[0])
      }).catch((e)=>console.warn(e));
    }
  },[dataCat, errorCat, isErrorCat])

  useEffect(()=> {
    if (!errorFnb && dataFnb?.length > 0) {
      setFnbMenus(dataFnb)
      db.get('fnb').catch(async (e)=>{
        const body = {
          _id: 'fnb',
          data: dataFnb,
          _attachments: await setAttachFnb(dataFnb)
        }
        db.put(body).catch((e)=>console.warn(e))
      });
    }else{
      db.get('fnb').then(function(doc) {
        setFnbMenus(doc?.data)
      }).catch((e)=>console.warn(e));
    }
  },[dataFnb, errorFnb, isErrorFnb])

  useEffect(()=> {
    if (fnbMenus?.length > 0) {
      const result = fnbMenus.filter((item)=> item.Slug === activeMenuChildern?.attributes?.Slug)
      if (result?.length > 0) {
        setSlideMenu(result)
      }
    }

    if (activeMenuChildern?.attributes?.Slug === 'all') {
      setSlideMenu(fnbMenus)
    }
  },[activeMenuChildern, fnbMenus])
  // console.log(activeMenuChildern, fnbMenus, errorCat, isErrorCat)
  return (
    <main className="flex-grow bg-[#2C1438]">
      <section className="Category bg-primary-200 hidden lg:grid grid-cols-4 border-t-4 border-primary-600">
        <aside className="ParentCategory flex flex-col justify-between bg-primary-100">
          <div className="grid">
            {categories.map((item, key) => (
              <button
                onClick={() => setActiveMenu(item)}
                key={key}
                className={`flex items-center justify-between text-black text-left h-14 px-8 ${
                  activeMenu.attributes?.Slug === item.attributes?.Slug ? "bg-primary-200" : ""
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
          <button onClick={()=> setActiveMenuChildern({attributes: {Slug: 'all', Title: 'All'}})} className="btn-secondary mx-4 mb-4">Show All</button>
        </aside>
        <main
          className={`col-span-3 min-h-[300px] grid gap-4 p-6 grid-cols-4`}
        >
          {
            activeMenu?.attributes?.fnbMenus?.data &&
            activeMenu?.attributes?.fnbMenus?.data?.map((item, key) => (
              <button
                key={key}
                className={`bg-white rounded-lg transition ease-out-expo duration-500 hover:scale-105 hover:shadow-xl flex justify-center ${
                  activeMenu.attributes?.Template === "Discover" ? "py-4 px-2" : "items-center px-2"
                }`}
                onClick={()=> setActiveMenuChildern(item)}
              >
                <span
                  className={`w-full h-full ${
                    activeMenu.attributes?.Template === "Discover"
                      ? "flex flex-col items-center space-y-6"
                      : "flex items-center space-x-4"
                  }`}
                >
                  <span className="font-bold flex items-center text-center overflow-hidden max-h-14 h-full">
                    {item.attributes?.Title}
                  </span>
                  {
                    item.attributes?.Icon?.data?.attributes?.url &&
                      <figure className="relative aspect-[3/2] w-full flex items-center">
                        <ImageHandle
                          style={{ objectFit: "contain"}}
                          data={item.attributes?.Icon?.data?.attributes}
                          dbtable="fnb"
                        />
                      </figure>
                  }
                </span>
              </button>
            ))
          }
        </main>
      </section>
      <SlideMenus data={slideMenu} imageDb="fnb" />
    </main>
  );
}