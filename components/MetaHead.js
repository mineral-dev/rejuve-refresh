import Head from "next/head"
import { useRouter } from "next/router"

export default function MetaSeo({
  data = {},
  defaults = {},
  structuredData,
  draft = false,
}) {
  const { asPath, query } = useRouter()
  const dataMeta = {
    title: "Re.juve Indonesia - Cold-Presssed Juice, Detox, Healthy Lifestyle",
    description:
      "Cold-Pressed Juice (jus) dari sayuran organik dan buah-buahan segar serta paket detox kami sudah dapat diorder online. #LiveHappier",
    type: "website",
    image: "https://static.mineralcdn.net/site/potatoheadco/og_image.png",
    viewport: "width=device-width, initial-scale=1 maximum-scale=1",
  }

  const dataDefault = {
    ...dataMeta,
    ...defaults,
    image: defaults?.image ? defaults?.image : dataMeta?.image,
  }

  // Image
  const ogImageContent = data?.metaImage
    ? data?.metaImage
    : dataDefault.image

  return (
    <Head>
      <title>
        {data?.metaTitle ?? dataDefault.title}
      </title>
      <link rel="icon" href="/favicon.png" sizes="any" />
      <meta name="viewport" content={dataDefault.viewport} />

      <meta
        name="robots"
        content={draft ? "no-index" : data?.metaRobots ?? "index"}
      />

      {data?.keywords && <meta name="keywords" content={data?.keywords} />}

      {data?.canonicalURL && <link rel="canonical" href={data.canonicalURL} />}

      {/* Universal Meta Tags */}
      <meta property="og:site_name" content="Re.juve Refresh" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={data?.type ?? dataDefault.type} />

      {/* Facebook Meta Tags */}
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_APP_URL}${asPath}`}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={data?.metaTitle ?? dataDefault.title}
      />
      <meta
        property="og:description"
        content={data?.metaDescription ?? dataDefault.description}
      />
      <meta property="og:image" content={ogImageContent} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:site" content={dataDefault.title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="refresh.rejuve.co.id" />
      <meta
        property="twitter:url"
        content={`${process.env.NEXT_PUBLIC_APP_URL}${asPath}`}
      />
      <meta
        name="twitter:title"
        content={data?.metaTitle ?? dataDefault.title}
      />
      <meta
        name="twitter:description"
        content={data?.metaDescription ?? dataDefault.description}
      />
      <meta property="twitter:image" content={ogImageContent} />

      {/* Structured Data */}
      {(data?.structuredData || structuredData) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data?.structuredData ?? structuredData),
          }}
        />
      )}
    </Head>
  )
}
