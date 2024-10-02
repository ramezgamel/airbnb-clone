"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SignInButton } from "@clerk/nextjs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { LuPenSquare, LuTrash2 } from "react-icons/lu";

export function SubmitButton({
  className,
  text = "Submit",
  size = "lg",
}: {
  className?: string;
  text?: string | React.ReactNode;
  size?: "lg" | "default" | "sm";
}) {
  const { pending } = useFormStatus();
  return (
    <div>
      <Button
        className={`capitalize ${className}`}
        size={size}
        type="submit"
        disabled={pending}
      >
        {pending ? (
          <span className="flex gap-1 items-center">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Loading..
          </span>
        ) : (
          text
        )}
      </Button>
    </div>
  );
}

export function CardSignInButton() {
  return (
    <SignInButton mode="modal">
      <Button
        size="icon"
        type="button"
        variant="outline"
        className="p-2 cursor-pointer"
        asChild
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  );
}

export function CardSubmitButton({ isFavorite }: { isFavorite: boolean }) {
  const { pending } = useFormStatus();
  const pathname = usePathname();
  return (
    <Button
      type="submit"
      size="icon"
      variant="outline"
      className="p- cursor-pointer"
    >
      {pending ? (
        <ReloadIcon className="animate-spin" />
      ) : isFavorite ? (
        <FaHeart className="text-red-500" />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
}

export function IconButton({ actionType }: { actionType: "edit" | "delete" }) {
  const { pending } = useFormStatus();
  const renderIcon = () => {
    switch (actionType) {
      case "edit":
        return <LuPenSquare />;
      case "delete":
        return <LuTrash2 />;
      default:
        throw new Error("Invalid action type");
    }
  };
  return (
    <Button
      size="icon"
      variant="link"
      type="submit"
      className="p-2 cursor-pointer"
    >
      {pending ? <ReloadIcon className="animate-spin" /> : renderIcon()}
    </Button>
  );
}
