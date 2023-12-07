import MenuPage from "@/components/MenuPage";
import { useRouter } from "next/router";

export default function MenuSlug() {
  const route = useRouter()
  return <MenuPage slug={route?.query?.slug} />;
}
