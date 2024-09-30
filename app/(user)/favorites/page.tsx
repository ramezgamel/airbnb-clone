import { getUserFaves } from "@/actions/property";
import EmptyList from "@/components/home/EmptyList";
import PropertiesList from "@/components/home/propertiesList";

export default async function FavoritesPage() {
  const favorites = await getUserFaves();
  if (favorites.length == 0) return <EmptyList />;
  return <PropertiesList properties={favorites} />;
}
