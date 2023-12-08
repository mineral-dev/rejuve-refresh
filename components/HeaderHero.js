import ImageWidth from "./ImageWidth";
import Logo from "./Logo";

export default function HeaderHero({
  hideImageOnMobile = false,
  classExtra,
  title,
  description,
  image,
  dbtable,
}) {
  return (
    <section className={`bg-white ${classExtra}`}>
      <div className="wrapper grid lg:grid-cols-2 gap-y-6 lg:gap-0 py-4 lg:py-12">
        <div
          className={`items-center justify-center ${
            hideImageOnMobile ? "hidden lg:flex" : "flex"
          }`}
        >
          {title && <h1 className="h3 text-primary-900">{title}</h1>}
          {image ? (
            <figure className="relative">
              <ImageWidth data={image} dbtable={dbtable} />
            </figure>
          ) : (
            <Logo />
          )}
        </div>
        {description && (
          <div className="flex items-center lg:px-8">
            <article
              dangerouslySetInnerHTML={{ __html: description }}
              className="prose"
            />
          </div>
        )}
      </div>
    </section>
  );
}
