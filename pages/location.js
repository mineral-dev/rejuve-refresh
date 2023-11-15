import HeaderHero from "@/components/HeaderHero";
import Link from "next/link";
import MapContainer from "@/components/GoogleMap";
import FooterBanner from "@/components/FooterBanner";

export default function Location() {
  return (
    <main className="flex-grow">
      <HeaderHero
        description={`<h4>Find Rejuve Re.fresh near you. Check out our store locator for the nearest location that sells Re.Fresh!</h4>`}
      />

      <section className="bg-white">
        <div className="wrapper py-12">
          <h1 className="text-primary-900">Our Locations</h1>

          <div className="grid grid-cols-3 gap-8 mt-12">
            <section>
              <div className="grid gap-y-2 divide-y divide-primary-200">
                {stores.map((item, key) => (
                  <StoreItem data={item} />
                ))}
              </div>
            </section>
            <section className="col-span-2 rounded-xl">
              <MapContainer location={location} />
            </section>
          </div>
        </div>
      </section>

      <FooterBanner />
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
        <h5>{data.name}</h5>
        <p>{data.address}</p>
        <Link href={data.cta.link} className="btn-primary btn-sm mt-4">
          {data.cta.caption}
        </Link>
      </div>
    </section>
  );
}

const location = {
  lat: -6.18298752457914, // Replace with your desired latitude
  lng: 106.74065351700509, // Replace with your desired longitude
};

const stores = [
  {
    name: "The Store Name",
    address: "Est deserunt id proident eu dolor deserunt amet.",
    cta: {
      icon: "",
      caption: "Contact Us",
      link: "/",
    },
  },
  {
    name: "The Store Name",
    address: "Est deserunt id proident eu dolor deserunt amet.",
    cta: {
      icon: "",
      caption: "Contact Us",
      link: "/",
    },
  },
];
