import MenuPage from "@/components/MenuPage";

export default function MenuSlug({ slug }) {
  return <MenuPage slug={slug} />;
}

export async function getServerSideProps({ params }) {
  return { props: { slug: params.slug } };
}
