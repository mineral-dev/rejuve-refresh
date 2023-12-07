import Banner from "@/components/Banner";
import BtnNext from "@/components/BtnNext";
import BtnPrev from "@/components/BtnPrev";
import HeaderHero from "@/components/HeaderHero";
import ImageHandle from "@/components/ImageFill";
import ImageWidth from "@/components/ImageWidth";
import MetaSeo from "@/components/MetaHead";
import db from "@/db/db";
import { useGetHomepageQuery, useGetSeoQuery } from "@/store/services/api";
import setAttachHomepage from "@/utils/setAttchDbHomepage";
import md from "markdown-it";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
export default function Home() {
  const swiperRef = useRef();
  const [post, setPost] = useState({});
  const [seo, setSeo] = useState(null);
  const { data, isError, error } = useGetHomepageQuery();
  const {
    data: dataSeo,
    isError: isErrorSeo,
    error: errorSeo,
  } = useGetSeoQuery({ page: "Homepage" });

  useEffect(() => {
    if ((!error && data?.attributes) || (!errorSeo && dataSeo?.length > 0)) {
      setPost(data?.attributes);
      if (dataSeo?.length > 0) {
        setSeo(dataSeo[0]?.attributes);
      }
      db.get("homepage").catch(async (e) => {
        const body = {
          _id: "homepage",
          data: data?.attributes,
          seo: dataSeo?.length > 0 ? dataSeo[0]?.attributes : {},
          _attachments: await setAttachHomepage(data?.attributes),
        };
        db.put(body).catch((e) => console.warn(e));
      });
    } else {
      db.get("homepage")
        .then(function (doc) {
          setPost(doc?.data);
          setSeo(doc?.seo);
        })
        .catch((e) => console.warn(e));
    }
  }, [data, error, isError, dataSeo, isErrorSeo, errorSeo]);

  return (
    <main>
      <MetaSeo data={seo} />

      {post?.Image?.data?.attributes && (
        <figure className="relative aspect-square lg:aspect-[16/5]">
          <ImageHandle
            style={{ objectFit: "cover" }}
            data={post?.Image?.data?.attributes}
            dbtable="homepage"
          />
        </figure>
      )}

      {post?.Intro && (
        <HeaderHero
          hideImageOnMobile={true}
          image={post?.Intro?.Image?.data?.attributes}
          description={md().render(post?.Intro?.Description)}
          dbtable="homepage"
        />
      )}

      {post?.Showcase && post?.Showcase?.length > 0 && (
        <section className="grid gap-y-8 py-12 xl:py-24">
          {post?.Showcase.map((item, key) => (
            <IntroSection key={key} index={key} data={item} />
          ))}
        </section>
      )}

      {post?.ShowcaseSecond && (
        <Banner
          data={{
            bgColor: post?.ShowcaseSecond?.ColorBg
              ? post?.ShowcaseSecond?.ColorBg
              : "#F8CA45",
            image: post?.ShowcaseSecond?.Image?.data?.attributes,
            dbtable: "homepage",
          }}
        >
          {post?.ShowcaseSecond?.Title && (
            <div className="h2">{post?.ShowcaseSecond?.Title}</div>
          )}
          {post?.ShowcaseSecond?.Description && (
            <article
              dangerouslySetInnerHTML={{
                __html: md().render(post?.ShowcaseSecond?.Description),
              }}
              className="prose text-center lg:text-left"
            />
          )}

          <div className="flex space-x-4">
            {post?.ShowcaseSecond?.Cta?.map((item, key) => (
              <Link
                key={key}
                href={item.Link ? item.Link : "#"}
                className={
                  key % 2 === 0 ? "btn-primary" : "btn-primary-outline"
                }
              >
                {item.Caption}
              </Link>
            ))}
          </div>
        </Banner>
      )}

      {post?.ShowcaseThird && (
        <section className="bg-[#FFF7E5] py-12 xl:py-24">
          <div className="wrapper flex flex-col space-y-6 items-center justify-center">
            {post?.ShowcaseThird?.Title && (
              <div className="h2">{post?.ShowcaseThird?.Title}</div>
            )}
            {post?.ShowcaseThird?.Description && (
              <article
                dangerouslySetInnerHTML={{
                  __html: md().render(post?.ShowcaseThird?.Description),
                }}
                className="prose max-w-screen-md text-center"
              />
            )}
          </div>
        </section>
      )}

      {post?.Slideshow && (
        <section className="bg-[#FCEADF] py-12 xl:py-24 overflow-hidden">
          <div className="wrapper text-center">
            {post?.Slideshow?.Title && (
              <div className="h2">{post?.Slideshow?.Title}</div>
            )}
          </div>
          {post?.Slideshow?.Slideshow &&
            post?.Slideshow?.Slideshow?.length > 0 && (
              <div className="relative mt-12">
                <Swiper
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  spaceBetween={50}
                  slidesPerView={2}
                  loop={true}
                  loopAddBlankSlides
                  centeredSlides={true}
                >
                  {post?.Slideshow?.Slideshow?.map((item, key) => (
                    <SwiperSlide key={key} className="!h-auto">
                      {({ isActive }) => (
                        <MenuThumb
                          data={item}
                          index={key}
                          isActive={isActive}
                        />
                      )}
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
            )}
        </section>
      )}
    </main>
  );
}

export function IntroSection({ index, data }) {
  return (
    <section
      className={`wrapper flex   items-center gap-8 xl:gap-16 ${
        index % 2 === 1
          ? "flex-col lg:flex-row-reverse"
          : "flex-col lg:flex-row"
      }`}
    >
      {data?.Image?.data?.attributes && (
        <figure className="relative aspect-[4/5] w-full lg:w-5/12">
          <ImageHandle
            style={{ objectFit: "cover" }}
            className="rounded-xl"
            data={data?.Image?.data?.attributes}
            dbtable="homepage"
          />
        </figure>
      )}
      <div className="lg:w-7/12 flex flex-col items-start space-y-6">
        {data?.Title && <div className="h3 capitalize">{data?.Title}</div>}
        {data?.Description && (
          <article
            dangerouslySetInnerHTML={{ __html: md().render(data?.Description) }}
            className="prose"
          />
        )}
        {data?.Cta?.Link && (
          <Link className="btn-primary-outline" href={data?.Cta?.Link}>
            {data?.Cta?.Caption}
          </Link>
        )}
      </div>
    </section>
  );
}

export function MenuThumb({ data, index, isActive }) {
  return (
    <section className="MenuThumb relative lg:!h-full flex items-center">
      <div
        className={`relative z-10 ${
          isActive ? "grid lg:grid-cols-2 gap-x-2" : "grid"
        }`}
      >
        {data?.Image?.data?.attributes.url && (
          <figure className="relative aspect-square">
            <ImageWidth
              data={data?.Image?.data?.attributes}
              dbtable="homepage"
            />
          </figure>
        )}

        {isActive && data?.Description && (
          <div className="flex flex-col items-center justify-center">
            <div className="h5 font-bold text-primary-600">{data?.Title}</div>
            <article
              dangerouslySetInnerHTML={{
                __html: md().render(data.Description),
              }}
              className="prose prose-headings:text-primary-600 prose-p:text-sm text-center"
            ></article>
          </div>
        )}
      </div>

      {isActive && (
        <>
          <svg
            className="lg:hidden absolute z-0 top-0 left-1/2 -translate-x-1/2"
            xmlns="http://www.w3.org/2000/svg"
            width="231.001"
            height="261.801"
            viewBox="0 0 231.001 261.801"
          >
            <path
              id="svgexport-14"
              d="M223.721,52.126C205.7,9.612,169.171.628,83.8.628,17.366.628,15.823,45.156,18.633,57.1c8.872,37.694,10.022,57.391-3.8,83.416C-13.46,193.77-2.28,252.448,57.039,257.459c97.088,8.2,106.926,6.279,142.436-5.934,20.456-7.035,37.553-44.279,24.245-69.946C192.115,120.621,250.578,115.487,223.721,52.126Z"
              transform="translate(0 -0.628)"
              fill={data?.ColorBg ? data?.ColorBg : "#f8d5c0"}
            />
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
              fill={data?.ColorBg ? data?.ColorBg : "#f8d5c0"}
            />
          </svg>
        </>
      )}

      {isActive && data?.Cta?.Link && (
        <div className="absolute bottom-0 right-1/2 translate-x-1/2 justify-center mt-12">
          <Link href={data?.Cta?.Link} className="btn-secondary">
            {data?.Cta?.Caption}
          </Link>
        </div>
      )}
    </section>
  );
}
