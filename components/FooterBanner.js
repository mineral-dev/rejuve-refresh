import MarkdownIt from "markdown-it";
import Link from "next/link";
import Banner from "./Banner";
import LogoRefresh from "./LogoRefresh";

export default function BannerFooter({ data, dbtable }) {
  console.log(data, "data");
  return (
    <Banner
      data={{
        bgColor: data?.ColorBg ? data?.ColorBg : "#F8D5C0",
        image: data?.Image?.data?.attributes,
        type: "image-top",
        dbtable: dbtable,
      }}
    >
      <LogoRefresh />

      {data?.Description && (
        <article
          dangerouslySetInnerHTML={{
            __html: MarkdownIt().render(data?.Description),
          }}
          className="prose text-center lg:text-left"
        />
      )}

      {data?.Cta?.Link && (
        <div>
          <Link href={data?.Cta?.Link} className="btn-primary">
            {data?.Cta?.Caption}
          </Link>
        </div>
      )}
    </Banner>
  );
}
