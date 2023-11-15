import Logo from "./Logo";

export default function HeaderHero({ title, description }) {
  return (
    <section className="bg-primary-100">
      <div className="wrapper grid grid-cols-2 py-12">
        <div>
            {
                title && (
                    <h1 className="h3 text-primary-900">{title}</h1>
                )
            }
            <Logo />
        </div>
        <div className="flex items-center px-8">
          <article
            dangerouslySetInnerHTML={{ __html: description }}
            className="prose"
          />
        </div>
      </div>
    </section>
  );
}
