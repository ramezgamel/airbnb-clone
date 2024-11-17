import {
  getUserProfile,
  updateUserProfile,
  updateProfileImage,
} from "@/actions/profile";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import { SubmitButton } from "@/components/form/buttons";

export default async function ProfilePage() {
  const profile = await getUserProfile();
  return (
    <section>
      <h1 className="text-center text-2xl capitalize mb-4">User Profile</h1>

      <FormContainer action={updateProfileImage}>
        <ImageInput />
      </FormContainer>

      <FormContainer action={updateUserProfile}>
        <div className="grid sm:grid-cols-2 gap-2">
          <FormInput
            name="firstName"
            type="text"
            defaultValue={profile?.firstName}
            label="First Name"
          />
          <FormInput
            name="lastName"
            defaultValue={profile?.lastName}
            type="text"
            label="Last Name"
          />
          <FormInput
            name="username"
            defaultValue={profile?.username}
            type="text"
            label="Username"
          />
        </div>
        <SubmitButton text="Update Profile" />
      </FormContainer>
    </section>
  );
}
