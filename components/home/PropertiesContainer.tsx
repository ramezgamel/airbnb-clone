import { fetchProperties } from "@/actions/property";
import EmptyList from "./EmptyList";
import { PropertyCardProps } from "@/utils/types";
import PropertiesList from "./propertiesList";

export default async function PropertiesContainer({
  category,
  search,
}: {
  search?: string;
  category?: string;
}) {
  const properties: PropertyCardProps[] = await fetchProperties({
    category,
    search,
  });
  if (properties.length == 0)
    return (
      <EmptyList
        heading="No results."
        text="Try changing or removing some of your filters."
        btn="Clear filter"
      />
    );

  return <PropertiesList properties={properties} />;
}
