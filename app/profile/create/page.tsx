import { createProfile } from "@/actions/profile";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/buttons";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await currentUser();
  if (!user && !user!.privateMetadata.hasProfile) redirect("/");
  return (
    <section>
      <h1 className="text-center text-2xl capitalize mb-4">New user Profile</h1>
      <FormContainer action={createProfile}>
        <div className="grid sm:grid-cols-2 gap-2">
          <FormInput name="firstName" type="text" label="First Name" />
          <FormInput name="lastName" type="text" label="Last Name" />
          <FormInput name="username" type="text" label="Username" />
        </div>
        <SubmitButton />
      </FormContainer>
    </section>
  );
}
