import Link from "next/link";
import Banner from "./Banner";
import LogoRefresh from "./LogoRefresh";

export default function BannerFooter() {
  return (
    <Banner
      data={{
        bgColor: "bg-[#F8D5C0]",
        image: "/img/banner/bowl.png",
        type:"image-top",
      }}
    >
      <LogoRefresh />

      <article
        dangerouslySetInnerHTML={{
          __html:
            "<p>Rooted in the mission to offer easy and nutritious solutions for the bustling city-dweller, Re.Fresh takes pride in the exceptional freshness and high quality ingredients.</p>",
        }}
        className="prose text-center lg:text-left"
      />

      <div>
        <Link href="/menu" className="btn-primary">
          Check our Menu
        </Link>
      </div>
    </Banner>
  );
}
