import MenuPage from "@/components/MenuPage";
import { useGetSeoQuery } from "@/store/services/api";

export default function Menu() {
  const { data: dataSeo, isError: isErrorSeo, error: errorSeo } = useGetSeoQuery({page: 'Menu'})

  return (
    <MenuPage slug="all" seo={dataSeo?.length > 0 ? dataSeo[0]?.attributes : {}} />
  );
}