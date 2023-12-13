import BannerFooter from "@/components/FooterBanner";
import MapContainer from "@/components/GoogleMap";
import HeaderHero from "@/components/HeaderHero";
import MetaSeo from "@/components/MetaHead";
import db from "@/db/db";
import {
  useGetLocationQuery,
  useGetSeoQuery,
  useGetStoreLocationQuery,
} from "@/store/services/api";
import setAttachLocation from "@/utils/setAttchDbLocation";
import setAttachStores from "@/utils/setAttchDbStores";
import MarkdownIt from "markdown-it";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Location() {
  const [post, setPost] = useState({});
  const [seo, setSeo] = useState(null);
  const [stores, setStores] = useState([]);
  const [markers, setMarkers] = useState([]);
  const {
    data: dataLoc,
    isError: isErrorLoc,
    error: errorLoc,
    loading: loadingLoc,
  } = useGetLocationQuery();
  const {
    data: dataStore,
    isError: isErrorStore,
    error: errorStore,
    loading: loadingStore,
  } = useGetStoreLocationQuery();
  const {
    data: dataSeo,
    isError: isErrorSeo,
    error: errorSeo,
  } = useGetSeoQuery({ page: "Location" });

  useEffect(() => {
    if (!errorLoc && dataLoc?.attributes) {
      setPost(dataLoc?.attributes);
      db.get("location").catch(async (e) => {
        const body = {
          _id: "location",
          data: dataLoc?.attributes,
          _attachments: await setAttachLocation(dataLoc?.attributes),
        };
        db.put(body).catch((e) => console.warn(e));
      });
    } else {
      db.get("location")
        .then(function (doc) {
          setPost(doc?.data);
        })
        .catch((e) => console.warn(e));
    }
  }, [dataLoc, isErrorLoc, errorLoc]);

  useEffect(() => {
    if (
      (!errorStore && dataStore?.length > 0) ||
      (!errorSeo && dataSeo?.length > 0)
    ) {
      setStores(dataStore);
      setMarkers(
        dataStore.map((item) => ({
          lat: item.attributes?.Lat,
          lng: item.attributes?.Lng,
        })),
      );
      if (dataSeo?.length > 0) {
        setSeo(dataSeo[0]?.attributes);
      }
      db.get("store").catch(async (e) => {
        const body = {
          _id: "store",
          data: dataStore,
          seo: dataSeo?.length > 0 ? dataSeo[0]?.attributes : {},
          _attachments: await setAttachStores(dataStore),
        };
        db.put(body).catch((e) => console.warn(e));
      });
    } else {
      db.get("store")
        .then(function (doc) {
          setStores(doc?.data);
          setMarkers(
            doc?.data?.map((item) => ({
              lat: item.attributes?.Lat,
              lng: item.attributes?.Lng,
            })),
          );
          setSeo(doc?.seo);
        })
        .catch((e) => console.warn(e));
    }
  }, [dataStore, isErrorStore, errorStore, dataSeo, isErrorSeo, errorSeo]);

  return (
    <main className="flex-grow">
      <MetaSeo data={seo} />
      {post?.Intro && (
        <HeaderHero
          classExtra="hidden lg:block"
          image={post?.Intro?.Image?.data?.attributes}
          description={MarkdownIt().render(post?.Intro?.Description)}
          dbtable="location"
        />
      )}

      <section className="bg-white">
        <div className="wrapper py-4 lg:py-12">
          <h1 className="text-primary-900">Our Locations</h1>

          <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-8 mt-4 lg:mt-12">
            <section>
              <div className="grid gap-y-2 divide-y divide-primary-200">
                {stores &&
                  stores?.length > 0 &&
                  stores.map((item, key) => (
                    <StoreItem data={item} key={key} />
                  ))}
              </div>
              <p className="text-center text-xl my-12">
                &mdash; More Stores coming soon &mdash;
              </p>
            </section>
            <section className="col-span-2 rounded-xl aspect-square sm:aspect-video">
              {markers && markers?.length > 0 && (
                <MapContainer location={location} markers={markers} />
              )}
            </section>
          </div>
        </div>
      </section>

      {/* {post?.Banner && <BannerFooter data={post?.Banner} dbtable="location" />} */}
    </main>
  );
}

export function StoreItem({ data }) {
  return (
    <section className="flex space-x-4 p-6">
      <div className="pt-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14.336"
          height="20.74"
          viewBox="0 0 14.336 20.74"
        >
          <g transform="translate(-201.812 -65.6)">
            <path
              className="fill-black"
              d="M208.98,65.6a7.037,7.037,0,0,0-7.166,7.22c0,5.257,6.721,13.112,7,13.447a.216.216,0,0,0,.322,0c.284-.334,7-8.19,7-13.447a7.037,7.037,0,0,0-7.166-7.22Zm0,11.36a4.082,4.082,0,1,1,2.882-1.2,4.078,4.078,0,0,1-2.882,1.2Z"
              transform="translate(0)"
            />
          </g>
        </svg>
      </div>
      <div>
        {data?.attributes?.Title && <h5>{data?.attributes?.Title}</h5>}
        {data?.attributes?.Address && <p>{data?.attributes?.Address}</p>}
        {data?.attributes?.Cta &&
          data?.attributes?.Cta?.length > 0 &&
          data?.attributes?.Cta?.map((item, key) => (
            <Link
              key={key}
              target="_blank"
              href={item?.Link ? item?.Link : "#"}
              className="btn-primary btn-sm mt-4"
            >
              {item.Caption}
            </Link>
          ))}
      </div>
    </section>
  );
}

const location = {
  lat: -6.18298752457914, // Replace with your desired latitude
  lng: 106.74065351700509, // Replace with your desired longitude
};
