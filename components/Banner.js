import ImageWidth from "./ImageWidth";

export default function Banner({ children, data }) {
  return (
    <section
      className={`py-12`}
      style={{ backgroundColor: data?.bgColor ? data?.bgColor : "#F8D5C0" }}
    >
      <div
        className={`wrapper flex lg:grid lg:grid-cols-2 gap-x-8 place-items-center ${
          data.type === "image-top" ? "flex-col space-y-4" : "flex-col-reverse"
        }`}
      >
        <figure className="relative">
          <ImageWidth data={data.image} dbtable={data?.dbtable} />
        </figure>
        <div className="flex flex-col items-center lg:grid gap-y-4">
          {children}
        </div>
      </div>
    </section>
  );
}
