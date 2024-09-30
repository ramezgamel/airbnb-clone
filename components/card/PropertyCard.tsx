import { formatCurrency } from "@/utils/format";
import { PropertyCardProps } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import PropertyRating from "./PropertyRating";
import FavoriteToggleButton from "./FavoriteToggleButton";
import CountryFlagAndName from "./CountryFlagAndName";
export default function PropertyCard({
  property,
}: {
  property: PropertyCardProps;
}) {
  const { name, image, price, country, id, tagline } = property;
  return (
    <article className="group relative">
      <Link href={`/properties/${id}`}>
        <div className="relative rounded-md overflow-hidden mb-2 h-[300px]">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width:768) 100vw, 50vw"
            className="rounded-md object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-sm mt-1 font-semibold">
            {name.substring(0, 30)}
          </h3>
          <PropertyRating inPage={false} propertyId={id} />
        </div>
        <p className="text-sm mt-1 text-muted-foreground">
          {tagline.substring(0, 40)}
        </p>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm mt-1">
            <span className="font-semibold">{formatCurrency(price) + " "}</span>
            night
          </p>
          <CountryFlagAndName countryCode={country} />
        </div>
      </Link>
      <div className="absolute top-5 right-5 z-5">
        <FavoriteToggleButton propertyId={id} />
      </div>
    </article>
  );
}
