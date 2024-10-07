import db from "@/db/db";
import { useEffect, useState } from "react";

export default function ImageFill({
  className,
  data,
  dbtable = "",
  style = {},
}) {
  const [urlImg, setUrlImg] = useState(null);

  const getUrlImgBlob = async (url) => {
    let blobOrBuffer = await db
      .getAttachment(dbtable, url)
      .catch((e) => console.warn(e));
    if (blobOrBuffer && url) {
      setUrlImg(URL.createObjectURL(blobOrBuffer));
    }
  };

  const fetchImg = async (data) => {
    await fetch(process.env.NEXT_PUBLIC_RESTAPI_URL)
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

  return urlImg ? (
    <image
      className={className}
      style={style}
      src={urlImg}
      alt={data?.name}
      fill
      loading="lazy"
    />
  ) : (
    <div></div>
  );
}
