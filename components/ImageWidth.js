import db from "@/db/db";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function ImageWidth({
  className,
  data,
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

  const fetchImg = useCallback( async () => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}`)
      .then((result) => {
        setUrlImg(`${process.env.NEXT_PUBLIC_RESTAPI_URL}${data?.url}`);
      })
      .catch((e) => {
        getUrlImgBlob(data?.name);
        console.warn(e);
      });
  },[data]);

  useEffect(() => {
    fetchImg();
  }, [data]);

  return urlImg ? (
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
    <div></div>
  );
}
