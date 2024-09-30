import { actionFunction } from "@/utils/types";
import Image from "next/image";
import { LuUser2 } from "react-icons/lu";

export default function ImageInputContainer({
  image,
  name,
  action,
  text,
  children,
}: {
  image: string;
  name: string;
  action: actionFunction;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      {image ? (
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          className="rounded object-cover mb-4 w-24 h-24"
        />
      ) : (
        <LuUser2 className="rounded bg-primary w-24 h-24 mb-4 text-white" />
      )}
    </div>
  );
}
