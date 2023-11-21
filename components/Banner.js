import Image from "next/image";
import Link from "next/link";

export default function Banner({ children, data }) {
  return (
    <section className={`${data.bgColor} py-12`}>
      <div className={`wrapper flex lg:grid lg:grid-cols-2 gap-x-8 place-items-center ${data.type === 'image-top' ? 'flex-col space-y-4' : 'flex-col-reverse'}`}>
        <figure className="relative">
          <Image src={data.image} width={500} height={500} alt="Re.juve" />
        </figure>
        <div className="flex flex-col items-center lg:grid gap-y-4">{children}</div>
      </div>
    </section>
  );
}
