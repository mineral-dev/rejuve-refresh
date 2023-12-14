import db from "@/db/db";
import { useGetMenusQuery } from "@/store/services/api";
import { memoizeMenus, setMenus } from "@/store/slice/main";
import setAttachDbMenu from "@/utils/setAttachDbMenu";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageFill from "./ImageFill";
import LogoRefresh from "./LogoRefresh";

export default function Header() {
  const menus = useSelector(memoizeMenus);
  const dispacth = useDispatch();
  const router = useRouter();
  const asPath = router.asPath;
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [isFoodMenu, setIsFoodMenu] = useState(false);
  const [hover, setHover] = useState({ status: false, name: "" });
  const { data, isError, error } = useGetMenusQuery();

  const handleHeaderLink = (e) => {
    e.preventDefault();
    console.log(e);
  };

  const handleMobileMenu = () => {
    setIsMobileMenu(!isMobileMenu);
    if (!isMobileMenu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  };

  const handleFoodMenu = () => {
    setIsFoodMenu(!isFoodMenu);
  };

  useEffect(() => {
    if (
      !error &&
      data?.attributes?.items?.data &&
      data?.attributes?.items?.data?.length > 0
    ) {
      dispacth(setMenus(data?.attributes?.items?.data));
      db.get("menus").catch(async (e) => {
        const body = {
          _id: "menus",
          data: data?.attributes?.items?.data,
          _attachments: await setAttachDbMenu(data?.attributes?.items?.data),
        };
        db.put(body).catch((e) => console.warn(e));
      });
    } else {
      db.get("menus")
        .then(function (doc) {
          dispacth(setMenus(doc?.data));
        })
        .catch((e) => console.warn(e));
    }
  }, [data, isError, error]);

  return (
    <header className="Header sticky z-10 top-0 inset-x-0 bg-slate-100 backdrop-blur border-t sm:border-t-0 py-3 sm:py-4">
      <div className="wrapper !px-0 flex justify-center divide-x-2">
        {menus.map((item, key) => (
          <Link
            key={key}
            href={item.attributes?.url}
            className={`flex flex-col items-center space-y-1 hover:text-primary-600 px-3 sm:px-8 group ${
              asPath === item.attributes?.url ? "text-primary-600" : ""
            }`}
          >
            <span className="relative text-center">
              <span className="font-bold text-xs sm:text-sm lg:text-base whitespace-nowrap">{item.attributes?.title}</span>
              {
                key !== 0 && (
                  <span className={`absolute -bottom-3 sm:-bottom-4 inset-x-0 content-[''] h-[4px] bg-primary-600 rounded-t-full transition-opacity duration-500 ${asPath === item.attributes?.url ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
                )
              }
            </span>
          </Link>
        ))}
      </div>
    </header>
  );
}

const links = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="52"
        height="52"
        viewBox="0 0 52 52"
      >
        <g
          id="Group_31116"
          data-name="Group 31116"
          transform="translate(-428 -114)"
        >
          <circle
            id="Ellipse_510"
            data-name="Ellipse 510"
            cx="26"
            cy="26"
            r="26"
            transform="translate(428 114)"
            className="fill-current"
          />
          <path
            id="Path_16218"
            data-name="Path 16218"
            d="M3.416-2.254a.151.151,0,0,1,.028.084.411.411,0,0,0,.014.1q-.014,0-.014.007s0,.007-.014.007a.352.352,0,0,1-.112-.21q-.056-.2-.105-.378t-.119-.378a.192.192,0,0,0-.119-.133.373.373,0,0,0-.245.077.207.207,0,0,0-.14.154,2.168,2.168,0,0,0-.112.3,2.168,2.168,0,0,1-.112.3q-.056.182-.133.371t-.175.385q-.112.266-.21.518t-.21.5A1.981,1.981,0,0,0,1.547-.3a1.981,1.981,0,0,1-.091.245.606.606,0,0,1-.119.217A.606.606,0,0,1,1.12.28L.742.406A.04.04,0,0,1,.714.42.738.738,0,0,1,.49.56Q.378.6.238.658.182.686.119.721A.246.246,0,0,1,0,.756.1.1,0,0,1-.049.777.1.1,0,0,0-.1.8.246.246,0,0,1-.2.882.31.31,0,0,1-.294.9.1.1,0,0,0-.357.889.393.393,0,0,1-.434.9Q-.6.9-.532.686A.151.151,0,0,0-.5.6.264.264,0,0,1-.49.518.765.765,0,0,1-.476.266a2.27,2.27,0,0,1,.084-.28q.14-.392.266-.8A.257.257,0,0,0-.1-.966a.458.458,0,0,1,.056-.308q.084-.238.175-.49t.2-.49L.364-2.31a.124.124,0,0,0,.014-.056q.07-.154.056-.175A.36.36,0,0,0,.28-2.59.239.239,0,0,1,.2-2.625a.111.111,0,0,1-.028-.091A.033.033,0,0,0,.14-2.751.063.063,0,0,1,.1-2.786a.228.228,0,0,1-.084-.07.249.249,0,0,1,.07-.021.216.216,0,0,0,.084-.035l.378-.126a.339.339,0,0,0,.2-.154l.168-.42a22.755,22.755,0,0,1,.938-2.212A.674.674,0,0,0,2-6.209a.206.206,0,0,0-.133-.182.566.566,0,0,0-.3-.021,1.02,1.02,0,0,0-.336.112Q.91-6.174.8-6.384a.243.243,0,0,1-.049-.077A.564.564,0,0,0,.7-6.552a.549.549,0,0,1-.056-.126Q.644-6.832.637-7a1.04,1.04,0,0,1,.049-.35.79.79,0,0,1,.077-.182,1.654,1.654,0,0,0,.091-.182A.274.274,0,0,0,.875-7.77.124.124,0,0,1,.91-7.826L1.232-8.3a.3.3,0,0,1,.126-.112q.084-.042.154-.07L2.52-8.736a7.012,7.012,0,0,1,1.008-.2q.5-.063.994-.133.35-.028.707-.035a4.306,4.306,0,0,1,.665.035q.14.014.28.021a1.591,1.591,0,0,1,.266.035,1.4,1.4,0,0,1,.98.42,1.14,1.14,0,0,1,.224.42,2.835,2.835,0,0,1,.1.518,1.788,1.788,0,0,1-.077.672,3.834,3.834,0,0,1-.3.714,2.777,2.777,0,0,1-.224.35q-.126.168-.28.35-.322.336-.665.644a7.447,7.447,0,0,1-.749.588,2.2,2.2,0,0,0-.273.175.237.237,0,0,0-.091.14.457.457,0,0,0,.014.189,3.114,3.114,0,0,1,.056.322q.014.1.028.189a1.543,1.543,0,0,0,.042.189q.028.084.049.168T5.32-2.8q.014.084.035.168a1.8,1.8,0,0,1,.035.182q.028.084.049.154a.589.589,0,0,1,.021.168.46.46,0,0,1,.014.112V-1.9q-.028.2-.042.4t-.028.4a.215.215,0,0,0-.028.084.2.2,0,0,1,.063.161q-.007.091-.021.189v.028q.028.2.049.378t.049.378A.186.186,0,0,1,5.53.231a.349.349,0,0,1-.112.133L5.166.616q-.2.154-.294.042L4.536.224Q4.508.168,4.487.119T4.438.014A3.8,3.8,0,0,0,4.2-.392.814.814,0,0,1,4.06-.6a.022.022,0,0,0-.014-.021q-.014-.007,0-.035a.285.285,0,0,0,0-.217,1.751,1.751,0,0,0-.112-.175q-.056-.14-.112-.273a1.553,1.553,0,0,0-.14-.259,1.357,1.357,0,0,1-.049-.147q-.021-.077-.035-.147a.574.574,0,0,0-.063-.2q-.049-.091-.1-.189ZM5.222-5.012l.266-.2a3.737,3.737,0,0,0,.455-.448q.217-.252.413-.49a.69.69,0,0,0,.175-.329.194.194,0,0,0-.119-.217,1.655,1.655,0,0,0-.329-.161A1.037,1.037,0,0,0,5.67-6.9q-.1,0-.189.007A.865.865,0,0,1,5.292-6.9a3.02,3.02,0,0,0-.581,0l-.623.056q-.546.154-.847.252A1.241,1.241,0,0,0,2.8-6.37a.507.507,0,0,0-.168.308,3.635,3.635,0,0,0-.028.518l.042.294a.491.491,0,0,0,.084.21.794.794,0,0,1,.07.392.919.919,0,0,0,.161.539.4.4,0,0,0,.329.14,1.171,1.171,0,0,0,.448-.126,4.245,4.245,0,0,0,.518-.294q.266-.175.511-.343A4.851,4.851,0,0,1,5.222-5.012ZM8.806-3.4a.311.311,0,0,1-.042.1.2.2,0,0,0-.028.112q0,.042-.056.07a.115.115,0,0,0-.042.07.1.1,0,0,1-.07.084q-.028.014-.042.112a.081.081,0,0,1,.056.014v.014h-.1A.364.364,0,0,0,8.5-2.94H8.47l-.042.294.056.028a.712.712,0,0,1,.014.14v.14a.688.688,0,0,0,.056.252,1.623,1.623,0,0,1,.1.21,1.623,1.623,0,0,0,.1.21q.154.154.322.3a.59.59,0,0,0,.336.161q.028,0,.105-.007t.168-.021l.168-.028a.716.716,0,0,1,.105-.014,2.973,2.973,0,0,0,.966-.518q.182-.14.35-.287t.35-.3l.042-.042.252-.28q.112-.112.217-.231a2.934,2.934,0,0,0,.2-.259.505.505,0,0,1,.063-.1.258.258,0,0,1,.105-.07q-.028.1-.049.182a.821.821,0,0,1-.063.168.329.329,0,0,1-.07.112,1.056,1.056,0,0,0-.119.14,1.218,1.218,0,0,0-.091.154l-.14.168-.056.084.112-.042a.13.13,0,0,1-.049.091.118.118,0,0,0-.049.077q.014.014.014.021s.009.012.028.021a.347.347,0,0,1-.063.091l-.077.077a2.864,2.864,0,0,0-.238.238,1.94,1.94,0,0,1-.2.2q-.1.084-.21.168a.914.914,0,0,0-.1.084.374.374,0,0,1-.1.07l-.168.112a.793.793,0,0,0-.126.063l-.126.077a1.461,1.461,0,0,1-.448.182L10-.784a2.54,2.54,0,0,1-.5.1.9.9,0,0,1-.245-.007q-.175-.021-.364-.056t-.357-.07a1.594,1.594,0,0,1-.238-.063,1.4,1.4,0,0,1-.5-.315,3.9,3.9,0,0,0-.308-.315.628.628,0,0,1-.2-.294,1.033,1.033,0,0,1-.07-.287q-.014-.147-.028-.3a2.673,2.673,0,0,1,.077-.637,3.156,3.156,0,0,1,.217-.609q.028-.07.035-.091A.388.388,0,0,0,7.5-3.85a.326.326,0,0,0-.084.056.3.3,0,0,0-.056.1,2.913,2.913,0,0,1-.168.364A.372.372,0,0,1,7.231-3.5q.035-.07.063-.14a4.626,4.626,0,0,1,.392-.714A3.821,3.821,0,0,1,8.2-5a2.939,2.939,0,0,1,.63-.532l.14-.07q.14-.056.182.028a.087.087,0,0,0,.063.028.087.087,0,0,1,.063.028.219.219,0,0,1,.042.056.219.219,0,0,0,.042.056,1.2,1.2,0,0,0,.168.063l.238.077q.126.042.238.084a.847.847,0,0,1,.154.07.383.383,0,0,1,.1.14q.056.1.105.189a.686.686,0,0,0,.119.161.122.122,0,0,1,.035.063.25.25,0,0,0,.021.063,1.128,1.128,0,0,1,.028.245,1.327,1.327,0,0,1-.028.259,1.368,1.368,0,0,1-.084.287,2.652,2.652,0,0,1-.126.259l-.084.14a.774.774,0,0,0-.07.154q-.028.07-.063.14t-.077.14a.376.376,0,0,1-.252.21.379.379,0,0,1-.266.042.124.124,0,0,0-.056-.014q-.028,0-.056-.042l-.014-.014a.14.14,0,0,1-.14-.056.31.31,0,0,0-.126-.1.1.1,0,0,1-.028-.07.07.07,0,0,0,.014-.07l-.028-.056Q9.044-3.122,9-3.213a1.288,1.288,0,0,0-.1-.175Q8.876-3.472,8.806-3.4ZM9.562-4.4a.968.968,0,0,0-.2.21q-.091.126-.189.238l-.1.154q-.084.14.028.21a.325.325,0,0,0,.063.049.325.325,0,0,1,.063.049.239.239,0,0,0,.147.077.63.63,0,0,0,.161-.007.335.335,0,0,0,.126-.091.887.887,0,0,0,.1-.133A1.589,1.589,0,0,1,9.877-3.9,1.589,1.589,0,0,0,10-4.158a.451.451,0,0,0,.056-.28.135.135,0,0,0-.112-.1.323.323,0,0,0-.189.035A1.433,1.433,0,0,0,9.562-4.4ZM7.434-1.946l-.028.014.042.112a.093.093,0,0,0,.021.056q.021.028-.007.07l-.028-.028a.837.837,0,0,1-.077-.238q-.021-.126-.049-.266v-.042q0-.154.007-.308a1.411,1.411,0,0,1,.049-.308.444.444,0,0,0,.028-.126v-.1a1.172,1.172,0,0,0-.084.2l-.042.2a2.247,2.247,0,0,0-.021.525,1.286,1.286,0,0,0,.133.469q.028.042.056.077t.056.077a.145.145,0,0,0,.1.056H7.63a.915.915,0,0,0-.056-.1.915.915,0,0,1-.056-.1.993.993,0,0,1-.042-.126A.547.547,0,0,0,7.434-1.946Zm0-.924q-.028.028-.028.042A1.037,1.037,0,0,0,7.35-2.5a1.757,1.757,0,0,0,.028.315l.028.028.042-.434a.712.712,0,0,0,.014-.14A.375.375,0,0,0,7.434-2.87Zm6.034,1.68a.2.2,0,0,1-.014.084q-.07.2-.126.4a1.275,1.275,0,0,1-.168.371.248.248,0,0,1-.14.112l-.2.049a.249.249,0,0,1-.2-.063l-.028-.014a.326.326,0,0,1-.28-.182.735.735,0,0,1-.112-.392,1.316,1.316,0,0,1,.1-.448,1.5,1.5,0,0,1,.238-.378q.042-.042.07-.028.21.042.406.091a.837.837,0,0,1,.364.2q.042.042.077.084A.128.128,0,0,1,13.468-1.19Zm6.622-5.8a.8.8,0,0,1-.336.112q-.168.014-.322.042a.05.05,0,0,1-.042.007.062.062,0,0,0-.028-.007q-.112,0-.21.007t-.2.021q-.448.056-.651.077a.6.6,0,0,0-.287.084.349.349,0,0,0-.119.2,2.653,2.653,0,0,1-.175.434.375.375,0,0,0,.028.42q.14.168.728.084l.406-.056a3.073,3.073,0,0,1,.406-.028l-.322.042a.152.152,0,0,1,.056.028.057.057,0,0,0,.042.014,2.511,2.511,0,0,1,.518-.056A3.32,3.32,0,0,0,20.1-5.6H19.46a1.3,1.3,0,0,1,.308-.056,3.364,3.364,0,0,1,.378-.007q.2.007.371.028a1.846,1.846,0,0,1,.273.049v.077q0,.035-.056.063-.028.028-.028.042a.262.262,0,0,1-.14.2q-.112.056-.224.126l-.091.063a.3.3,0,0,0-.077.077.1.1,0,0,1-.07.063.216.216,0,0,0-.084.035,5.409,5.409,0,0,0-.784.224,1.027,1.027,0,0,1-.266.077q-.14.021-.28.049l-.112.028-.49.168q-.42.154-.623.238a.9.9,0,0,0-.315.2.949.949,0,0,0-.189.336q-.077.217-.259.651-.07.154-.175.434l-.217.581-.217.581q-.1.28-.175.434-.042.112-.077.217t-.063.217q-.056.2-.1.4t-.084.4a.444.444,0,0,1-.028.126q-.112.028-.217.049t-.217.049a.8.8,0,0,1-.189.028A1.251,1.251,0,0,1,14.77.63l-.252-.1L14.252.42A1.166,1.166,0,0,0,14.14.371a.48.48,0,0,1-.1-.049.335.335,0,0,1-.084-.476A.865.865,0,0,0,14-.287a.865.865,0,0,1,.042-.133l.126-.6a.479.479,0,0,1,.035-.1.479.479,0,0,0,.035-.1.762.762,0,0,0,.042-.147q.014-.077.028-.161.014-.14.063-.4t.1-.546q.049-.287.077-.546A1.942,1.942,0,0,0,14.56-3.4q-.028-.1-.049-.189t-.049-.189a.056.056,0,0,0-.028-.056.122.122,0,0,0-.063-.035.065.065,0,0,1-.049-.035.219.219,0,0,1-.042-.056A.1.1,0,0,0,14.21-4q-.07,0-.042-.1a.149.149,0,0,0,.021-.091.647.647,0,0,0-.021-.077.988.988,0,0,1,0-.616.368.368,0,0,1,.035-.056A.368.368,0,0,0,14.238-5h.028q.126.112.175.105t.133-.189a.614.614,0,0,0,.07-.126l.07-.056q.028.042.049.077a.387.387,0,0,1,.035.077q.056.14.1.161a.454.454,0,0,0,.21-.007q.112-.014.224-.021a1.241,1.241,0,0,0,.224-.035q.126.154.252-.028a.373.373,0,0,0,.084-.126q.154-.364.28-.609a1.676,1.676,0,0,0,.161-.42.35.35,0,0,0-.056-.294.814.814,0,0,0-.385-.217.188.188,0,0,1-.1-.063.962.962,0,0,1-.07-.091q-.042-.056-.077-.112a.793.793,0,0,1-.063-.126l-.07-.14q-.028-.056-.063-.119a.177.177,0,0,1-.007-.147q.028-.028,0-.07a.518.518,0,0,1-.014-.315q.042-.161.07-.315,0-.1.14-.126.028,0,.028.014a.343.343,0,0,0,.308.126l.9.056a.264.264,0,0,1-.014.084.46.46,0,0,1-.112.014h-.112l-.42.028a.086.086,0,0,0-.049.014.822.822,0,0,1-.077.042,1.511,1.511,0,0,0,.147.042.55.55,0,0,0,.119.014q.126.014.252.021t.266.007a.258.258,0,0,0,.147-.028q.035-.028.035-.14v-.1a.164.164,0,0,1,.21.014.326.326,0,0,0,.063.049q.035.021.1-.021a.543.543,0,0,1-.028.07.06.06,0,0,0,0,.056.137.137,0,0,0,.1.028l1.4-.07a1.151,1.151,0,0,0,.175-.014.3.3,0,0,1,.161.014,1.09,1.09,0,0,0,.35.028l.364-.028a.517.517,0,0,0,.133-.021q.077-.021.147-.035l.084.028a.264.264,0,0,0,.084.014h.273q.133,0,.273-.014.182-.014.35-.021t.35-.007A.283.283,0,0,0,21.9-8.19a.326.326,0,0,0-.056-.084q.014-.028.1-.063t.119-.007l.084.1q.028.056.056.056a.131.131,0,0,1,.1.07.915.915,0,0,0,.056.1.24.24,0,0,1-.014.28.261.261,0,0,0-.042.091.338.338,0,0,0,.028.091l-.28.168h.126a.432.432,0,0,1-.056.147q-.028.035-.14.007a.305.305,0,0,0-.224.07,1.466,1.466,0,0,1-.2.119.3.3,0,0,1-.21.021l.308-.14-.266.042q-.1.014-.042.1-.07,0-.07-.042v-.1a.155.155,0,0,0,.049-.007.155.155,0,0,1,.049-.007l-.014-.028a2.094,2.094,0,0,0-.294-.007,1.009,1.009,0,0,0-.294.063.728.728,0,0,1-.175.035q-.091.007-.189.021a1.19,1.19,0,0,1-.259.028.4.4,0,0,0-.245.084Zm-.476.056q0-.014-.007-.014s-.007,0-.007-.014l-.07.028V-6.9Zm.28-.056a1.159,1.159,0,0,1-.126.028Q19.838-6.9,19.894-6.986ZM22.12-2.52q-.084.252-.021.28t.168-.056a1.23,1.23,0,0,0,.21-.224.882.882,0,0,0,.133-.224,1.3,1.3,0,0,1,.1-.28l.2-.42q.1-.224.2-.413t.14-.259q.07-.1.126-.189t.112-.2a3.5,3.5,0,0,0,.224-.35.333.333,0,0,1,.224-.168,1.205,1.205,0,0,0,.133-.007,1.205,1.205,0,0,1,.133-.007.262.262,0,0,1,.2.084.98.98,0,0,1,.147.224v.056l.1.574a1.134,1.134,0,0,1,.021.28q-.007.14-.007.28,0,.1.007.189a.865.865,0,0,1-.007.189q.056.028.056.063t.014.021a.065.065,0,0,1,.077-.007.065.065,0,0,0,.077-.007l.056-.07a.985.985,0,0,0,.084-.063.538.538,0,0,0,.084-.091q.056-.1.14,0a.133.133,0,0,1-.056.112l-.042.07q-.028.084-.084.1L25.032-3l-.042.042-.042.028a.214.214,0,0,1-.154.07.211.211,0,0,0-.126.056q-.07.042-.112,0a.583.583,0,0,0-.147-.063,1.357,1.357,0,0,1-.147-.049.4.4,0,0,1-.217-.133A.817.817,0,0,1,23.9-3.3a1.178,1.178,0,0,1-.07-.4,2.818,2.818,0,0,1,.028-.4.665.665,0,0,0,.028-.182,1.02,1.02,0,0,1,.014-.168L23.94-4.7a.283.283,0,0,0,.014-.154q-.042,0-.042.014l-.056.07-.2.35a.577.577,0,0,0-.084.252.089.089,0,0,1-.007.077q-.021.035-.035.063-.1.182-.175.357t-.147.371a2.659,2.659,0,0,1-.119.28q-.063.126-.133.28-.1.224-.2.427a2.482,2.482,0,0,0-.175.441q-.028.07-.063.154t-.063.168l-.077.154-.133.266a2.7,2.7,0,0,1-.147.259,1.154,1.154,0,0,1-.105.147.032.032,0,0,1-.021.035.138.138,0,0,0-.049.035.393.393,0,0,1-.273.2.933.933,0,0,1-.315-.028q-.028.028-.084-.028a.411.411,0,0,1-.259-.189,1.074,1.074,0,0,1-.133-.357,3.2,3.2,0,0,1-.035-.364q-.007-.182-.007-.364.014-.28.021-.546t.035-.546q.028-.154.035-.238t.014-.154q.007-.07.021-.147A2.159,2.159,0,0,1,21-3.64q.042-.21.056-.315t.028-.189a1.262,1.262,0,0,1,.049-.189l.1-.315a.631.631,0,0,1,.042-.133q.028-.063.056-.133.07-.2.14-.364t.154-.336a.345.345,0,0,1,.091-.175.2.2,0,0,1,.161-.007,1.073,1.073,0,0,1,.161.014,1.543,1.543,0,0,1,.189.042.631.631,0,0,1,.133.042.664.664,0,0,1,.147.1,1.034,1.034,0,0,0,.168.245q.1.105.21.231a.881.881,0,0,1,.119.315.727.727,0,0,1-.049.343.484.484,0,0,1-.049.14.409.409,0,0,1-.035.042.409.409,0,0,0-.035.042.484.484,0,0,0-.049.14,4.017,4.017,0,0,1-.35.812A3.28,3.28,0,0,0,22.12-2.52ZM27.062-3.4a.311.311,0,0,1-.042.1.2.2,0,0,0-.028.112q0,.042-.056.07a.115.115,0,0,0-.042.07.1.1,0,0,1-.07.084q-.028.014-.042.112a.081.081,0,0,1,.056.014v.014h-.1a.364.364,0,0,0,.014-.112h-.028l-.042.294.056.028a.712.712,0,0,1,.014.14v.14a.688.688,0,0,0,.056.252,1.623,1.623,0,0,1,.1.21,1.623,1.623,0,0,0,.1.21q.154.154.322.3a.59.59,0,0,0,.336.161q.028,0,.1-.007t.168-.021L28.1-1.26a.716.716,0,0,1,.105-.014,2.973,2.973,0,0,0,.966-.518q.182-.14.35-.287t.35-.3l.042-.042.252-.28q.112-.112.217-.231a2.934,2.934,0,0,0,.2-.259.505.505,0,0,1,.063-.1.258.258,0,0,1,.1-.07q-.028.1-.049.182a.821.821,0,0,1-.063.168.329.329,0,0,1-.07.112,1.056,1.056,0,0,0-.119.14,1.218,1.218,0,0,0-.091.154l-.14.168-.056.084.112-.042a.13.13,0,0,1-.049.091.118.118,0,0,0-.049.077q.014.014.014.021s.009.012.028.021a.347.347,0,0,1-.063.091l-.077.077a2.864,2.864,0,0,0-.238.238,1.94,1.94,0,0,1-.2.2q-.1.084-.21.168a.914.914,0,0,0-.1.084.374.374,0,0,1-.1.07l-.168.112a.793.793,0,0,0-.126.063l-.126.077a1.461,1.461,0,0,1-.448.182l-.126.042a2.54,2.54,0,0,1-.5.1A.9.9,0,0,1,27.5-.693q-.175-.021-.364-.056t-.357-.07a1.594,1.594,0,0,1-.238-.063,1.4,1.4,0,0,1-.5-.315,3.9,3.9,0,0,0-.308-.315.628.628,0,0,1-.2-.294,1.033,1.033,0,0,1-.07-.287q-.014-.147-.028-.3a2.673,2.673,0,0,1,.077-.637,3.156,3.156,0,0,1,.217-.609q.028-.07.035-.091a.388.388,0,0,0-.007-.119.326.326,0,0,0-.084.056.3.3,0,0,0-.056.1,2.913,2.913,0,0,1-.168.364.372.372,0,0,1,.035-.168q.035-.07.063-.14a4.626,4.626,0,0,1,.392-.714A3.821,3.821,0,0,1,26.46-5a2.938,2.938,0,0,1,.63-.532l.14-.07q.14-.056.182.028a.087.087,0,0,0,.063.028.087.087,0,0,1,.063.028.219.219,0,0,1,.042.056.219.219,0,0,0,.042.056,1.2,1.2,0,0,0,.168.063l.238.077q.126.042.238.084a.847.847,0,0,1,.154.07.383.383,0,0,1,.1.14q.056.1.1.189a.686.686,0,0,0,.119.161.122.122,0,0,1,.035.063.25.25,0,0,0,.021.063,1.128,1.128,0,0,1,.028.245,1.327,1.327,0,0,1-.028.259,1.368,1.368,0,0,1-.084.287,2.652,2.652,0,0,1-.126.259L28.5-3.3a.774.774,0,0,0-.07.154q-.028.07-.063.14t-.077.14a.376.376,0,0,1-.252.21.379.379,0,0,1-.266.042.124.124,0,0,0-.056-.014q-.028,0-.056-.042l-.014-.014a.14.14,0,0,1-.14-.056.31.31,0,0,0-.126-.1.1.1,0,0,1-.028-.07.07.07,0,0,0,.014-.07l-.028-.056q-.042-.084-.084-.175a1.289,1.289,0,0,0-.1-.175Q27.132-3.472,27.062-3.4Zm.756-.994a.968.968,0,0,0-.2.21q-.091.126-.189.238l-.1.154q-.084.14.028.21a.325.325,0,0,0,.063.049.325.325,0,0,1,.063.049.239.239,0,0,0,.147.077.63.63,0,0,0,.161-.007.335.335,0,0,0,.126-.091.887.887,0,0,0,.1-.133,1.589,1.589,0,0,1,.119-.259,1.589,1.589,0,0,0,.119-.259.451.451,0,0,0,.056-.28.135.135,0,0,0-.112-.1.323.323,0,0,0-.189.035A1.433,1.433,0,0,0,27.818-4.4ZM25.69-1.946l-.028.014.042.112a.093.093,0,0,0,.021.056q.021.028-.007.07l-.028-.028a.837.837,0,0,1-.077-.238q-.021-.126-.049-.266v-.042q0-.154.007-.308a1.411,1.411,0,0,1,.049-.308.444.444,0,0,0,.028-.126v-.1a1.172,1.172,0,0,0-.084.2l-.042.2a2.247,2.247,0,0,0-.021.525,1.286,1.286,0,0,0,.133.469q.028.042.056.077t.056.077a.145.145,0,0,0,.1.056h.042a.915.915,0,0,0-.056-.1.915.915,0,0,1-.056-.1.993.993,0,0,1-.042-.126A.547.547,0,0,0,25.69-1.946Zm0-.924q-.028.028-.028.042a1.037,1.037,0,0,0-.056.329,1.757,1.757,0,0,0,.028.315l.028.028L25.7-2.59a.712.712,0,0,0,.014-.14A.374.374,0,0,0,25.69-2.87ZM30.6,1.806l.126-.175q.056-.077.126-.161a.212.212,0,0,0-.063.007.8.8,0,0,0-.119.077V1.512a.092.092,0,0,1-.042-.042.138.138,0,0,1-.049.035.064.064,0,0,0-.035.035.331.331,0,0,1-.1.056q-.049.014-.119.042a.135.135,0,0,1-.1-.014l.028-.07a.124.124,0,0,0-.056.014.124.124,0,0,1-.056.014.082.082,0,0,1-.07.042.143.143,0,0,1-.224-.07.993.993,0,0,1-.042-.126.208.208,0,0,0-.056-.1.366.366,0,0,1-.084-.189,1.968,1.968,0,0,0-.042-.217A.634.634,0,0,1,29.666.7a.947.947,0,0,1,.091-.259A2.833,2.833,0,0,1,29.9.2a4.714,4.714,0,0,1,.728-.84,2.257,2.257,0,0,0,.287-.308.606.606,0,0,0,.112-.238.441.441,0,0,0-.021-.231q-.042-.119-.1-.273a2.819,2.819,0,0,0-.161-.427q-.091-.189-.2-.385a.387.387,0,0,0-.035-.077.387.387,0,0,1-.035-.077,1.684,1.684,0,0,1-.112-.273q-.07-.2-.133-.434t-.105-.441a1.764,1.764,0,0,1-.042-.308q.028-.028.021-.049t.021-.063a.4.4,0,0,1,.07-.252.434.434,0,0,0,.028-.084.158.158,0,0,0-.014-.112.907.907,0,0,0,.049-.119.907.907,0,0,1,.049-.119q.028-.056.042-.091l.042-.105a.186.186,0,0,0,.042-.063.186.186,0,0,1,.042-.063l.126-.252a.864.864,0,0,1,.1-.154,1.274,1.274,0,0,0,.1-.14.417.417,0,0,1,.056-.042.177.177,0,0,0,.084-.1q.07-.084.1-.056a1.186,1.186,0,0,1,.252.168.04.04,0,0,1,.028.014.471.471,0,0,1,.1.119,1.464,1.464,0,0,1,.119.21,2.56,2.56,0,0,1,.1.238.608.608,0,0,1,.042.189.162.162,0,0,0,.028.112V-4.8a.344.344,0,0,1-.028.126,1.708,1.708,0,0,0-.049.182.762.762,0,0,1-.063.182.685.685,0,0,0-.042.07.09.09,0,0,1-.056.042.288.288,0,0,0-.112.14A.367.367,0,0,1,31.318-4a.1.1,0,0,0-.014.091v.014l-.014.028-.112.224a.758.758,0,0,0-.042.266.787.787,0,0,0,.028.238.515.515,0,0,0,.07.105q.042.049.07.077a.552.552,0,0,1,.133.175q.063.119.126.245t.119.245a.63.63,0,0,0,.112.175.2.2,0,0,1,.07.133.235.235,0,0,0,.056.133.162.162,0,0,0,.147.119.492.492,0,0,0,.231-.049q.126-.056.273-.126a2.017,2.017,0,0,1,.287-.112l.315-.231q.161-.119.315-.245.224-.168.448-.364.07-.07.133-.14t.133-.14l.21-.238.056.14a.261.261,0,0,1-.014.252l-.028.056a.124.124,0,0,0-.014.056.991.991,0,0,1-.126.266.793.793,0,0,0-.091.14.793.793,0,0,1-.091.14l-.182.168-.294.252-.056.056a2.232,2.232,0,0,0-.224.161q-.112.091-.224.175l-.154.126a1.054,1.054,0,0,1-.231.133q-.119.049-.224.1a.5.5,0,0,0-.175.133.339.339,0,0,0-.07.224,1.194,1.194,0,0,0,.028.161.355.355,0,0,1,.014.1.36.36,0,0,1-.021.112q-.021.063-.049.189a.059.059,0,0,1,0,.056.059.059,0,0,0,0,.056.107.107,0,0,0-.014.042V-.07a.266.266,0,0,0-.035.161.356.356,0,0,1-.021.161.25.25,0,0,1-.07.07L32.06.35a1.336,1.336,0,0,1-.091.133.547.547,0,0,0-.077.133,1.006,1.006,0,0,1-.1.154q-.077.1-.161.2t-.168.182l-.126.126-.112.14a.261.261,0,0,1-.119.1q-.077.035-.147.063l-.028.028a.459.459,0,0,1-.266.154ZM30.45.224a.281.281,0,0,1-.14.084.334.334,0,0,0-.21.21A.412.412,0,0,1,29.96.7a.627.627,0,0,0-.14.182A.623.623,0,0,0,29.806,1a.236.236,0,0,1-.028.105.159.159,0,0,0,.028.182l.168.2a.11.11,0,0,0,.154-.014l.168-.14.168-.182A1.1,1.1,0,0,0,30.772.77a.138.138,0,0,0,.035-.049.384.384,0,0,1,.021-.049A1.646,1.646,0,0,0,31,.308a.46.46,0,0,0,.063-.2.754.754,0,0,1,.049-.21q.014,0,.014-.042,0-.168-.084-.154a.41.41,0,0,0-.189.1,2.527,2.527,0,0,0-.224.224Q30.506.168,30.45.224Zm5.964-3.7a1.92,1.92,0,0,1,.2-.2q.126-.112.259-.238l.259-.245q.126-.119.2-.189a1.478,1.478,0,0,1,.728-.392.99.99,0,0,1,.742.168.637.637,0,0,1,.091.336,3.427,3.427,0,0,1-.014.434,3.238,3.238,0,0,1-.07.434q-.049.21-.077.35a2.516,2.516,0,0,1-.1.315q-.07.189-.154.4t-.154.4l-.112.3q-.042.322.119.364a.617.617,0,0,0,.385-.049,2.182,2.182,0,0,0,.441-.245q.217-.154.3-.224l.084-.056q.084-.056.175-.126t.175-.126q.084-.056.084-.07a.551.551,0,0,1,.224-.182.528.528,0,0,0,.224-.2,1.566,1.566,0,0,0,.175-.287.852.852,0,0,1,.2-.273q.084-.07.112-.063t.028.049a.318.318,0,0,1-.035.119,1.458,1.458,0,0,1-.077.147q-.07.1-.119.161a1.431,1.431,0,0,0-.084.119l-.077.126q-.042.07-.1.168a1.935,1.935,0,0,1-.147.189.529.529,0,0,0-.119.217.286.286,0,0,1-.175.147.524.524,0,0,0-.2.133q-.07.084-.133.168a1.75,1.75,0,0,0-.119.182q-.028.028-.112.1l-.175.147q-.091.077-.175.14t-.1.077a.994.994,0,0,1-.462.245,1.143,1.143,0,0,1-.56.014.743.743,0,0,1-.441-.308,1.041,1.041,0,0,1-.1-.749,1.956,1.956,0,0,1,.161-.476q.133-.294.287-.6t.294-.595q.14-.287.21-.441a1.959,1.959,0,0,0,.1-.28.249.249,0,0,0,.028-.112v-.126a.405.405,0,0,0-.28-.224.642.642,0,0,0-.336.035.908.908,0,0,0-.308.2,1.551,1.551,0,0,0-.224.259q-.028.028-.077.07a.282.282,0,0,0-.077.112.878.878,0,0,1-.168.224l-.714.882q-.07.084-.147.168a1.923,1.923,0,0,0-.147.182q-.042.07-.175.308t-.273.518l-.259.518q-.119.238-.161.308a.8.8,0,0,0-.084.252q-.014.07-.028.119T35-.126q-.014.07-.035.14t-.035.14a.775.775,0,0,1-.056.2.288.288,0,0,1-.112.14.219.219,0,0,0-.042.056.685.685,0,0,1-.042.07h-.084A.086.086,0,0,0,34.517.6a1.043,1.043,0,0,0-.1.021q-.084.014-.042.021t-.028.007A.047.047,0,0,1,34.3.623a.106.106,0,0,0-.042-.035.312.312,0,0,0-.077-.1.612.612,0,0,1-.091-.1.7.7,0,0,1-.2-.476A3.872,3.872,0,0,1,33.81-1.5,11.293,11.293,0,0,1,34.1-3.08q.2-.8.462-1.526t.427-1.26q.154-.322.308-.637t.336-.637q.21-.406.434-.784a6.561,6.561,0,0,1,.476-.7,3.818,3.818,0,0,1,.686-.742.471.471,0,0,1,.511-.063,1.669,1.669,0,0,1,.539.371,3.156,3.156,0,0,1,.448.567,1.694,1.694,0,0,1,.238.525.635.635,0,0,1,.1.266.545.545,0,0,1-.042.322q-.042.1-.07.028a.169.169,0,0,0-.1-.1l-.112-.042-.168-.056a.2.2,0,0,0-.21.1l-.2.21q-.154.154-.343.385a3.18,3.18,0,0,0-.3.427q-.07.112-.133.2a.915.915,0,0,1-.147.154A.243.243,0,0,0,37.191-6a.243.243,0,0,1-.049.077q-.084.154-.175.294t-.175.28l-.266.49q-.112.2-.21.378t-.2.378q-.07.182-.154.35t-.154.35q-.056.14-.091.224t-.063.161a1.439,1.439,0,0,0-.049.168q-.021.091-.049.231,0,.14.119.049a1.862,1.862,0,0,0,.273-.273q.154-.182.294-.371A1.525,1.525,0,0,0,36.414-3.472Z"
            transform="translate(435.131 147.744) rotate(-11)"
            fill="#f8f3f7"
          />
        </g>
      </svg>
    ),
    caption: "What's Re.fresh",
    link: "/",
    hasChildren: false,
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35.861"
        height="48.069"
        viewBox="0 0 35.861 48.069"
      >
        <defs>
          <clipPath id="clipPath">
            <rect
              id="Rectangle_2528"
              data-name="Rectangle 2528"
              width="35.861"
              height="48.069"
              className="fill-current"
            />
          </clipPath>
        </defs>
        <g
          id="Group_31120"
          data-name="Group 31120"
          transform="translate(-598 -237)"
        >
          <g
            id="Group_31119"
            data-name="Group 31119"
            transform="translate(598 237)"
          >
            <g
              id="Group_31118"
              data-name="Group 31118"
              clipPath="url(#clipPath)"
            >
              <path
                id="Path_16073"
                data-name="Path 16073"
                d="M31.664,48.069H4.2a4.2,4.2,0,0,1-4.2-4.2V4.2A4.2,4.2,0,0,1,4.2,0H31.664a4.2,4.2,0,0,1,4.2,4.2V43.872a4.2,4.2,0,0,1-4.2,4.2M4.2,2.289A1.91,1.91,0,0,0,2.289,4.2V43.872A1.91,1.91,0,0,0,4.2,45.78H31.664a1.91,1.91,0,0,0,1.907-1.907V4.2a1.91,1.91,0,0,0-1.907-1.907Z"
                className="fill-current"
              />
              <path
                id="Path_16074"
                data-name="Path 16074"
                d="M24.456,7.289H6.144A1.144,1.144,0,0,1,6.144,5H24.456a1.144,1.144,0,0,1,0,2.289"
                transform="translate(2.63 2.63)"
                className="fill-current"
              />
              <path
                id="Path_16075"
                data-name="Path 16075"
                d="M24.456,12.289H6.144a1.144,1.144,0,1,1,0-2.289H24.456a1.144,1.144,0,0,1,0,2.289"
                transform="translate(2.63 5.26)"
                className="fill-current"
              />
              <path
                id="Path_16076"
                data-name="Path 16076"
                d="M24.456,17.289H6.144a1.144,1.144,0,0,1,0-2.289H24.456a1.144,1.144,0,0,1,0,2.289"
                transform="translate(2.63 7.89)"
                className="fill-current"
              />
              <path
                id="Path_16077"
                data-name="Path 16077"
                d="M24.456,22.289H6.144a1.144,1.144,0,1,1,0-2.289H24.456a1.144,1.144,0,1,1,0,2.289"
                transform="translate(2.63 10.52)"
                className="fill-current"
              />
              <path
                id="Path_16078"
                data-name="Path 16078"
                d="M16.826,27.289H6.144a1.144,1.144,0,0,1,0-2.289H16.826a1.144,1.144,0,1,1,0,2.289"
                transform="translate(2.63 13.15)"
                className="fill-current"
              />
            </g>
          </g>
        </g>
      </svg>
    ),
    caption: "Our Menu",
    link: "/menu",
    hasChildren: true,
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="47.001"
        height="51.996"
        viewBox="0 0 47.001 51.996"
      >
        <defs>
          <clipPath id="clipPath">
            <rect
              id="Rectangle_2529"
              data-name="Rectangle 2529"
              width="47.001"
              height="51.996"
              transform="translate(0 0)"
              className="fill-current"
            />
          </clipPath>
        </defs>
        <g id="Group_31122" data-name="Group 31122" transform="translate(0 0)">
          <g id="Group_31121" data-name="Group 31121" clipPath="url(#clipPath)">
            <path
              id="Path_16079"
              data-name="Path 16079"
              d="M6.468,11.842a1,1,0,0,0,1.066,0C8.2,11.425,14,7.656,14,3.815A3.719,3.719,0,0,0,10.662.024,4.115,4.115,0,0,0,7,1.55,4.114,4.114,0,0,0,3.34.024,3.719,3.719,0,0,0,0,3.815c0,3.841,5.805,7.61,6.467,8.027M3.578,2.011A1.842,1.842,0,0,1,3.813,2,2.34,2.34,0,0,1,6.029,4.053a1,1,0,0,0,1.944,0,2.292,2.292,0,0,1,2.451-2.042A1.727,1.727,0,0,1,12,3.815C12,5.715,9.127,8.34,7,9.8,4.875,8.34,2,5.72,2,3.815a1.727,1.727,0,0,1,1.577-1.8"
              className="fill-current"
            />
            <path
              id="Path_16080"
              data-name="Path 16080"
              d="M23,10A21,21,0,1,0,44,31,21,21,0,0,0,23,10m0,40A19,19,0,1,1,42,31,19,19,0,0,1,23,50"
              className="fill-current"
            />
            <path
              id="Path_16081"
              data-name="Path 16081"
              d="M33.082,21.23a1,1,0,0,0-.123,1.409h0a12.975,12.975,0,1,1-3.26-2.788,1,1,0,0,0,1.1-1.672l-.067-.04a15,15,0,1,0,3.76,3.212,1,1,0,0,0-1.409-.122"
              className="fill-current"
            />
            <path
              id="Path_16082"
              data-name="Path 16082"
              d="M23,40a8.9,8.9,0,0,0,7.9-4.553,1,1,0,1,0-1.788-.9,7.129,7.129,0,0,1-12.214,0,1,1,0,1,0-1.788.9A8.9,8.9,0,0,0,23,40"
              className="fill-current"
            />
            <path
              id="Path_16083"
              data-name="Path 16083"
              d="M16,29.015A1,1,0,0,1,18,29a1,1,0,0,0,2,0,3,3,0,1,0-6,0,.994.994,0,0,0,.987.993H15a1.006,1.006,0,0,0,1-.981"
              className="fill-current"
            />
            <path
              id="Path_16084"
              data-name="Path 16084"
              d="M32,29a3,3,0,1,0-6,0,.994.994,0,0,0,.987.993H27a1.006,1.006,0,0,0,1-.981A1,1,0,0,1,30,29a1,1,0,1,0,2,0"
              className="fill-current"
            />
            <path
              id="Path_16085"
              data-name="Path 16085"
              d="M35.8,10.976A.962.962,0,0,0,36,11a1,1,0,0,0,.979-.8l1-5a1,1,0,0,0-1.947-.46c-.005.023-.009.045-.013.068l-1,5a1,1,0,0,0,.781,1.172"
              className="fill-current"
            />
            <path
              id="Path_16086"
              data-name="Path 16086"
              d="M43.626,5.215a1,1,0,0,0-1.406.156l-4,5a1,1,0,1,0,1.562,1.25l4-5A1,1,0,0,0,43.626,5.215Z"
              className="fill-current"
            />
            <path
              id="Path_16087"
              data-name="Path 16087"
              d="M42,14a1,1,0,0,0,.446-.105l4-2a1,1,0,1,0-.894-1.79l-4,2A1,1,0,0,0,42,14"
              className="fill-current"
            />
          </g>
        </g>
      </svg>
    ),
    caption: "How to Enjoy",
    link: "/enjoy",
    hasChildren: false,
  },
  {
    icon: (
      <svg
        id="Group_31124"
        data-name="Group 31124"
        xmlns="http://www.w3.org/2000/svg"
        width="54"
        height="50"
        viewBox="0 0 54 50"
      >
        <defs>
          <clipPath id="clipPath">
            <rect
              id="Rectangle_2530"
              data-name="Rectangle 2530"
              width="54"
              height="50"
              className="fill-current"
            />
          </clipPath>
        </defs>
        <g id="Group_31123" data-name="Group 31123" clipPath="url(#clipPath)">
          <path
            id="Path_16088"
            data-name="Path 16088"
            d="M52.679,44.643H50V21.05a4.464,4.464,0,0,0,2.679-4.086V15.179h-.022a.882.882,0,0,0,0-.217L50,4.354V.893A.893.893,0,0,0,49.107,0H4.464a.893.893,0,0,0-.893.893V4.354L.92,14.962a.882.882,0,0,0,0,.217H.893v1.786A4.464,4.464,0,0,0,3.571,21.05V44.643H.893A.893.893,0,0,0,0,45.536v3.571A.893.893,0,0,0,.893,50H52.679a.893.893,0,0,0,.893-.893V45.536a.893.893,0,0,0-.893-.893m-4.464-25a2.678,2.678,0,0,1-2.679-2.679v-.893h5.357v.893a2.678,2.678,0,0,1-2.679,2.679M15.994,5.357l-.744,8.929H9.982l1.488-8.929Zm26.107,0,1.488,8.929H38.321l-.744-8.929Zm-6.315,0,.744,8.929H31.25V5.357Zm-6.321,8.929H24.107V5.357h5.357Zm-7.143,0H17.042l.744-8.929h4.536Zm-12.5,1.786h5.357v.893a2.679,2.679,0,1,1-5.357,0Zm7.143,0h5.357v.893a2.679,2.679,0,0,1-5.357,0Zm7.143,0h5.357v.893a2.679,2.679,0,1,1-5.357,0Zm7.143,0h5.357v.893a2.679,2.679,0,1,1-5.357,0Zm7.143,0H43.75v.893a2.679,2.679,0,1,1-5.357,0ZM45.4,14.286,43.911,5.357h4.5l2.232,8.929ZM48.214,3.571H5.357V1.786H48.214ZM5.162,5.357h4.5L8.172,14.286H2.929ZM2.679,16.964v-.893H8.036v.893a2.679,2.679,0,1,1-5.357,0m2.679,4.464a4.447,4.447,0,0,0,3.571-1.813,4.423,4.423,0,0,0,7.143,0,4.423,4.423,0,0,0,7.143,0,4.423,4.423,0,0,0,7.143,0,4.423,4.423,0,0,0,7.143,0,4.423,4.423,0,0,0,7.143,0,4.447,4.447,0,0,0,3.571,1.813V44.643H46.429V25.893A.893.893,0,0,0,45.536,25H36.607a.893.893,0,0,0-.893.893v18.75H5.357ZM44.643,44.643H37.5V26.786h7.143Zm7.143,3.571h-50V46.429h50Z"
            className="fill-current"
          />
          <path
            id="Path_16089"
            data-name="Path 16089"
            d="M33.893,28h-25A.893.893,0,0,0,8,28.893V43.179a.893.893,0,0,0,.893.893h25a.893.893,0,0,0,.893-.893V28.893A.893.893,0,0,0,33.893,28M33,42.286H9.786v-12.5H33Z"
            transform="translate(-0.857 -3)"
            className="fill-current"
          />
        </g>
      </svg>
    ),
    caption: "Locations",
    link: "/location",
    hasChildren: false,
  },
];
