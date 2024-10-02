import { format, formatDistanceStrict } from "date-fns";
import Image from "next/image";

export default function UserInfo({
  profileImage,
  firstName,
  createdAt,
}: {
  profileImage: string;
  firstName: string;
  createdAt: Date;
}) {
  return (
    <article className="grid grid-cols-[auto,1fr] gap-4 mt-4">
      <Image
        src={profileImage}
        alt={firstName}
        width={50}
        height={50}
        className="rounded w-12 h-12 object-cover"
      />
      <div>
        <p>
          Hosted by <span className="font-bold"> {firstName}</span>
        </p>
        <p className="text-muted-foreground font-light">
          Superhost &middot;{" "}
          {formatDistanceStrict(createdAt, Date.now(), { addSuffix: true })}{" "}
          hosting
        </p>
      </div>
    </article>
  );
}
