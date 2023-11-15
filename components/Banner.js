import Image from "next/image";
import Link from "next/link";

export default function Banner({ children, data }) {
  return (
    <section className={`${data.bgColor} py-12`}>
      <div className="wrapper grid grid-cols-2 gap-x-8 place-items-center">
        <figure className="relative">
          <Image src={data.image} width={500} height={500} alt="Re.juve" />
        </figure>
        <div className="grid gap-y-4">{children}</div>
      </div>
    </section>
  );
}
