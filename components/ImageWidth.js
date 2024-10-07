import db from "@/db/db";
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
    <img
      className={className}
      style={style}
      src={urlImg}
      alt={data?.name}
      width={data?.width}
      height={data?.height}
      loading="lazy"
    />
  ) : (
    <div></div>
  );
}
