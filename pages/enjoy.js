import FooterBanner from "@/components/FooterBanner";
import HeaderHero from "@/components/HeaderHero";
import Image from "next/image";
import Link from "next/link";

export default function Enjoy() {
  return (
    <main className="flex-grow flex flex-col justify-between">
      <HeaderHero
        title="How to Enjoy"
        description={`<h4>Enjoy your favorite smoothies and dishes by visiting our local stores,
          or having them delivered to your doorstep. It's all about what works for you!</h4>`}
      />

      <section className="bg-primary-100 pb-12 xl:pb-24">
        <div className="wrapper grid grid-cols-2 gap-2">
          {cards.map((item, key) => (
            <Card key={key} data={item} />
          ))}
        </div>
      </section>

      <FooterBanner />
    </main>
  );
}

export function Card({ data }) {
  return (
    <section className="Card">
      <figure className="relative aspect-video rounded-t-xl overflow-hidden">
        <Image
          src={data.image}
          fill
          style={{ objectFit: "cover" }}
          alt="Re.juve"
        />
      </figure>
      <div className="bg-[#F8D5C0] flex flex-col items-center space-y-4 text-center rounded-b-xl p-8">
        <article
          dangerouslySetInnerHTML={{ __html: data.description }}
          className="prose prose-p:font-bold"
        />
        <Link href={data.cta.link} className="btn-primary">
          {data.cta.caption}
        </Link>
      </div>
    </section>
  );
}

const cards = [
  {
    icon: "",
    image: "/img/enjoy/card_one.jpg",
    description: "<h5>Dine-In</h5><p>Visit our local stores</p>",
    cta: {
      caption: "Check our Locations",
      link: "/",
    },
  },
  {
    icon: "",
    image: "/img/enjoy/card_two.jpg",
    description: "<h5>Delivery</h5><p>Delivered to your doorstep</p>",
    cta: {
      caption: "Check our Locations",
      link: "/",
    },
  },
];
