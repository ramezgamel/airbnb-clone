"use client";
import { useToast } from "@/components/hooks/use-toast";
import { SignOutButton } from "@clerk/nextjs";

export default function SignOutLink() {
  const { toast } = useToast();

  const handleLogOut = () => {
    toast({
      description: "You have been Logged out",
    });
  };
  return (
    <SignOutButton redirectUrl="/">
      <button onClick={handleLogOut}>Logout</button>
    </SignOutButton>
  );
}
