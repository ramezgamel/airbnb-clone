import { getProfileImage } from "@/actions/profile";
import { LuUser2 } from "react-icons/lu";
export default async function UserIcon() {
  const profileImage = await getProfileImage();

  if (profileImage && typeof profileImage == "string") {
    return (
      <img
        src={profileImage}
        className="w-6 h-6 text-white rounded-full bg-primary"
      />
    );
  }
  return <LuUser2 className="w-6 h-6 text-white rounded-full bg-primary" />;
}
