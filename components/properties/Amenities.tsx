import React from "react";
import Title from "./Title";
import { LuFolderCheck } from "react-icons/lu";

export default function Amenities({ amenities }: { amenities: string }) {
  const amenitiesList = JSON.parse(amenities);
  if (amenitiesList.length == 0) return null;
  return (
    <div className="mt-4">
      <Title text="What this place offer" />
      <div className="grid md:grid-cols-2 gap-x-4">
        {amenitiesList.map(
          (amenity: { selected: any; name: React.Key | null | undefined }) => {
            if (amenity.selected)
              return (
                <div
                  key={amenity.name}
                  className="flex items-center gap-x-4 mb-2"
                >
                  <LuFolderCheck className="h-6 w-6 text-primary" />
                  <span className="font-light text-sm capitalize">
                    {amenity.name}
                  </span>
                </div>
              );
          }
        )}
      </div>
    </div>
  );
}
