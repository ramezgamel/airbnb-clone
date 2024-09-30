import { PropertyCardProps } from "@/utils/types";
import React from "react";
import PropertyCard from "../card/PropertyCard";

export default function propertiesList({
  properties,
}: {
  properties: PropertyCardProps[];
}) {
  return (
    <section className="mt-4 grid sm:grid-cols-2 gap-8 lg:grid-cols-3  xl:grid-cols-4">
      {properties.map((item) => (
        <PropertyCard key={item.id} property={item} />
      ))}
    </section>
  );
}
