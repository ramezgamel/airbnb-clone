import { fetchPropertyRating } from "@/actions/property";
import { IoIosStar } from "react-icons/io";

export default async function PropertyRating({
  propertyId,
  inPage,
}: {
  propertyId: string;
  inPage: boolean;
}) {
  const { rating, count } = await fetchPropertyRating(propertyId);
  if (count == 0) return null;
  return (
    <div className="flex justify-between items-center gap-1">
      <IoIosStar className="w-3 h-3 " />
      <span
        className={`${inPage ? "text-md" : "text-xs"} text-muted-foreground`}
      >
        {rating} ({count})
      </span>
    </div>
  );
}
