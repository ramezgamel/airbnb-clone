import { IoIosStar } from "react-icons/io";

export default function PropertyRating({
  propertyId,
  inPage,
}: {
  propertyId: string;
  inPage: boolean;
}) {
  return (
    <div className="flex justify-between items-center gap-1">
      <IoIosStar className="w-3 h-3 " />
      <span
        className={`${inPage ? "text-md" : "text-xs"} text-muted-foreground`}
      >
        4.7 (100)
      </span>
    </div>
  );
}
