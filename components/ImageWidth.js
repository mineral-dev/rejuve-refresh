import db from "@/db/db";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImageWidth({
  className,
  data,
  classShimmer = "w-10 h-10 bg-gray-100",
  dbtable = "",
  style = {},
}) {
  const [urlImg, setUrlImg] = useState(null);

  const getUrlImgBlob = async (url) => {
    let blobOrBuffer = await db.getAttachment(dbtable, url);
    if (blobOrBuffer && url) {
      setUrlImg(URL.createObjectURL(blobOrBuffer));
    }
  };

  const fetchImg = async (data) => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}`)
      .then((result) => {
        setUrlImg(`${process.env.NEXT_PUBLIC_RESTAPI_URL}${data?.url}`);
      })
      .catch((e) => {
        getUrlImgBlob(data?.name);
      });
  };

  useEffect(() => {
    fetchImg(data);
  }, [data]);

  return (
    <>
      {urlImg ? (
        <Image
          className={className}
          style={style}
          src={urlImg}
          alt={data?.name}
          priority={true}
          width={data?.width}
          height={data?.height}
        />
      ) : (
        <div className={classShimmer}></div>
      )}
    </>
  );
}
