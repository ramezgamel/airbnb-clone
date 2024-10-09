import { fetchPropertyDetails, isExistingReview } from "@/actions/property";
import { redirect } from "next/navigation";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import Image from "next/image";
import ShareButton from "@/components/properties/ShareButton";
import PropertyRating from "@/components/card/PropertyRating";
import { formatQuantity } from "@/utils/format";
import UserInfo from "@/components/properties/UserInfo";
import { Separator } from "@/components/ui/separator";
import Description from "@/components/properties/Describtion";
import Amenities from "@/components/properties/Amenities";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import SubmitReview from "@/components/reviews/SubmitReview";
import PropertyReviews from "@/components/reviews/PropertyReviews";
import { auth } from "@clerk/nextjs/server";

const DynamicMap = dynamic(
  () => import("@/components/properties/PropertyMap"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full" />,
  }
);

const DynamicBookingWrapper = dynamic(
  () => import("@/components/booking/BookingWrapper"),
  { ssr: false, loading: () => <Skeleton className="h-[200px] w-full" /> }
);

export default async function PropertyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const property = await fetchPropertyDetails(params.id);
  if (!property) redirect("/");
  const { userId } = auth();

  const isReviewExisting =
    userId &&
    userId !== property.profile.clerkId &&
    (await !isExistingReview(property.id, userId));
  return (
    <section>
      <BreadCrumbs name={property.name} />
      <header className="flex justify-between items-center mt-4">
        <h1 className="text-4xl font-bold capitalize">{property.tagline}</h1>
        <div className="flex gap-x-2 items-center">
          {/* share option */}
          <ShareButton propertyId={params.id} name={property.name} />
          <FavoriteToggleButton propertyId={property.id} />
        </div>
      </header>
      <section className="relative mt-8 h-[300px] md:h-[500px]">
        <Image src={property.image} sizes="100vh" fill alt={property.tagline} />
      </section>
      <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
        <div className="lg:col-span-8">
          <div className="flex gap-x-4 items-center">
            <h1 className="text-xl font-bold">{property.name}</h1>
            <PropertyRating propertyId={property.id} inPage />
          </div>
          <p className="text-md text-muted-foreground">
            <span>{formatQuantity(property.bedrooms, "bedroom")} &middot;</span>
            <span> {formatQuantity(property.baths, "bath")} &middot;</span>
            <span> {formatQuantity(property.guests, "guest")} &middot;</span>
            <span> {formatQuantity(property.beds, "bed")}</span>
          </p>
          <UserInfo
            createdAt={property.createdAt}
            profileImage={property.profile.profileImage}
            firstName={property.profile.firstName}
          />
          <Separator className="mt-4" />
          <Description title="Description" description={property.description} />
          <Amenities amenities={property.amenities} />
          <DynamicMap countryCode={property.country} />
        </div>
        <div className="lg:col-span-4 flex flex-col items-center">
          <DynamicBookingWrapper
            propertyId={property.id}
            price={property.price}
            bookings={property.bookings}
          />
        </div>
      </section>
      <section>
        {isReviewExisting && <SubmitReview propertyId={property.id} />}
        <PropertyReviews propertyId={property.id} />
      </section>
    </section>
  );
}
