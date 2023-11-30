import BannerFooter from "@/components/FooterBanner";
import HeaderHero from "@/components/HeaderHero";
import ImageFill from "@/components/ImageFill";
import db from "@/db/db";
import { useGetEnjoyQuery } from "@/store/services/api";
import setAttachEnjoy from "@/utils/setAttchDbEnjoy";
import MarkdownIt from "markdown-it";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Enjoy() {
  const [post, setPost] = useState({})
  const { data, isError, error, loading } = useGetEnjoyQuery()

  useEffect(()=>{
    if (!error && data?.attributes) {
      setPost(data?.attributes)
      db.get('enjoy').catch(async (e)=>{
        const body = {
          _id: 'enjoy',
          data: data?.attributes,
          _attachments: await setAttachEnjoy(data?.attributes)
        }
        db.put(body).catch((e)=>console.warn(e))
      });
    }else{
      db.get('enjoy').then(function(doc) {
        setPost(doc?.data)
      }).catch((e)=>console.warn(e));
    }
  },[data, isError, error])

  return (
    <main className="flex-grow flex flex-col justify-between">
      {
        post?.Intro &&
        <HeaderHero
          image={post?.Intro?.Image?.data?.attributes}
          description={MarkdownIt().render(post?.Intro?.Description)}
          dbtable="enjoy"
        />
      }

      {
        (post?.Showcase && post?.Showcase?.length > 0 ) && (
          <section className="bg-primary-100 pb-12 xl:pb-24">
            <div className="wrapper grid lg:grid-cols-2 gap-4">
              {post?.Showcase.map((item, key) => (
                <Card key={key} data={item} dbtable="enjoy" />
              ))}
            </div>
          </section>
        )
      }

      {
        post?.Banner &&
        <BannerFooter data={post?.Banner} dbtable="enjoy" />
      }
    </main>
  );
}

export function Card({ data, dbtable }) {
  return (
    <section className="Card">
      {
        data.Image?.data?.attributes &&
        <figure className="relative aspect-video rounded-t-xl overflow-hidden hidden lg:block">
          <ImageFill 
            data={data.Image?.data?.attributes} 
            dbtable={dbtable}
            style={{ objectFit: "cover" }}
          />
        </figure>
      }
      <div style={{backgroundColor: data?.ColorBg ? data?.ColorBg : '#F8D5C0'}} className="flex flex-col items-center space-y-4 text-center rounded-t-xl lg:rounded-t-0 rounded-b-xl p-8">
        {
          data?.Icon?.data?.attributes &&
          <figure className="relative w-24 h-24">
            <ImageFill
              style={{ objectFit: "contain"}}
              data={data?.Icon?.data?.attributes}
              dbtable={dbtable}
            />
          </figure>
        }
        {
          data.Title &&
          <div className="h5">{data?.Title}</div>
        }
        {
          data.Description &&
          <article
            dangerouslySetInnerHTML={{ __html: data.Description }}
            className="prose prose-sm"
          />
        }
        {
          data.Cta?.Link &&
          <Link href={data.Cta?.Link} className="btn-primary">
            {data.Cta?.Caption}
          </Link>
        }
      </div>
    </section>
  );
}

const cards = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
        <defs>
          <clipPath id="clip-path">
            <rect id="Rectangle_2553" data-name="Rectangle 2553" width="61.72" height="53.404" fill="#e9d8e8"/>
          </clipPath>
        </defs>
        <g id="Group_31064" data-name="Group 31064" transform="translate(0 -0.445)">
          <circle id="Ellipse_508" data-name="Ellipse 508" cx="50" cy="50" r="50" transform="translate(0 0.445)" fill="#963588"/>
          <g id="Group_31201" data-name="Group 31201" transform="translate(19.14 23.743)">
            <g id="Group_31200" data-name="Group 31200" clipPath="url(#clip-path)">
              <path id="Path_16153" data-name="Path 16153" d="M18.706,41.037H14.678a.751.751,0,0,1-.78-.78v-8.9A6.5,6.5,0,0,0,7.792,24.8,6.372,6.372,0,0,0,1.1,31.162v15.4a3.563,3.563,0,0,0,3.573,3.573h7.991a.751.751,0,0,1,.78.78V59.1a2.773,2.773,0,0,0,2.794,2.794h3.573A2.773,2.773,0,0,0,22.6,59.1V45a3.844,3.844,0,0,0-3.9-3.963" transform="translate(-0.385 -8.683)" fill="#e9d8e8"/>
              <path id="Path_16154" data-name="Path 16154" d="M7.147,0A7.147,7.147,0,1,1,0,7.147,7.147,7.147,0,0,1,7.147,0" fill="#e9d8e8"/>
              <path id="Path_16155" data-name="Path 16155" d="M75.9,24.8a6.377,6.377,0,0,0-6.367,6.367V40.2a.751.751,0,0,1-.78.78H64.728A4.048,4.048,0,0,0,60.7,45.005V59.168a2.773,2.773,0,0,0,2.794,2.794h3.573a2.773,2.773,0,0,0,2.794-2.794V50.982a.751.751,0,0,1,.78-.78h7.991A3.563,3.563,0,0,0,82.2,46.629V31.167A6.281,6.281,0,0,0,75.9,24.8" transform="translate(-21.264 -8.688)" fill="#e9d8e8"/>
              <path id="Path_16156" data-name="Path 16156" d="M80.147,0A7.147,7.147,0,1,1,73,7.147,7.147,7.147,0,0,1,80.147,0" transform="translate(-25.573)" fill="#e9d8e8"/>
              <path id="Path_16157" data-name="Path 16157" d="M53.662,40.614A2.024,2.024,0,0,0,51.648,38.6H28.714a2.014,2.014,0,0,0,0,4.028H38.2V64.912a2.014,2.014,0,1,0,4.028,0V42.628h9.485a2.012,2.012,0,0,0,1.949-2.014" transform="translate(-9.353 -13.522)" fill="#e9d8e8"/>
              <path id="Path_16158" data-name="Path 16158" d="M36.718,30.365a.838.838,0,0,0,.769.577H48.353a.806.806,0,0,0,.769-.577l2.212-7.4a.846.846,0,0,0-.1-.674A.685.685,0,0,0,50.661,22H35.276a.685.685,0,0,0-.577.288.846.846,0,0,0-.1.674Z" transform="translate(-12.108 -7.707)" fill="#e9d8e8"/>
            </g>
          </g>
        </g>
      </svg>
    ),
    image: "/img/enjoy/card_one.jpg",
    description: "<h5>Dine-In</h5><p>Visit our local stores</p>",
    cta: {
      caption: "Check our Locations",
      link: "/",
    },
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
        <defs>
          <clipPath id="clip-path">
            <rect id="Rectangle_2552" data-name="Rectangle 2552" width="52.486" height="58.461" fill="#963588"/>
          </clipPath>
        </defs>
        <g id="Group_31064" data-name="Group 31064" transform="translate(0 -0.445)">
          <circle id="Ellipse_508" data-name="Ellipse 508" cx="50" cy="50" r="50" transform="translate(0 0.445)" fill="#f5c0a0"/>
          <g id="Group_31199" data-name="Group 31199" transform="translate(23.757 18.445)">
            <g id="Group_31199-2" data-name="Group 31199" clip-path="url(#clip-path)">
              <path id="Path_16152" data-name="Path 16152" d="M9.9,15.708a5.148,5.148,0,0,0-5.077,4.4L.048,52.622A5.147,5.147,0,0,0,5.14,58.461h42.2a5.18,5.18,0,0,0,5.092-5.853l-4.77-32.481a5.148,5.148,0,0,0-5.077-4.418H40.152v6.824a1.456,1.456,0,0,1-1.464,1.457h-.006a1.458,1.458,0,0,1-1.464-1.456c0-2.189.026-5.38.009-6.825V10.923c-.574-14.558-21.4-14.57-21.975,0,.02,1.431.009,8.515,0,11.612a1.464,1.464,0,0,1-2.929-.01V15.708Zm8.281-4.785C18.551.253,33.926.254,34.3,10.923v4.785H18.177V10.923" transform="translate(0 0)" fill="#963588"/>
            </g>
          </g>
        </g>
      </svg>
    ),
    image: "/img/enjoy/card_two.jpg",
    description: "<h5>Delivery</h5><p>Delivered to your doorstep</p>",
    cta: {
      caption: "Check our Locations",
      link: "/",
    },
  },
];
