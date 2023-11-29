import ImageWidth from "./ImageWidth";

export default function HeaderHero({ title, description, image, dbtable }) {
  return (
    <section className="bg-primary-100">
      <div className="wrapper grid lg:grid-cols-2 gap-y-6 lg:gap-0 py-4 lg:py-12">
        <div>
          {title && <h1 className="h3 text-primary-900">{title}</h1>}
          {
            image ?
            <figure className="relative">
              <ImageWidth data={image} dbtable={dbtable} />
            </figure> :
            <Logo />
          }
        </div>
        <div className="flex items-center lg:px-8">
          <article
            dangerouslySetInnerHTML={{ __html: description }}
            className="prose"
          />
        </div>
      </div>
    </section>
  );
}
