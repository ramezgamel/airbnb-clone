import { createPropertyAction } from "@/actions/property";
import AmenitiesInput from "@/components/form/AmenitiesInput";
import CounterInput from "@/components/form/CounterInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import FormSelector from "@/components/form/FormSelector";
import ImageInput from "@/components/form/ImageInput";
import { SubmitButton } from "@/components/form/buttons";
import TextareaInput from "@/components/form/TextareaInput";
import { SelectItem } from "@/components/ui/select";
import { categories } from "@/utils/categories";
import { formattedCountries } from "@/utils/countries";
import React from "react";

export default async function createPropertyPage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        create property
      </h1>
      <div className="border p-8 rounded">
        <h3 className="text-lg mb-4 font-medium">General info</h3>
        <FormContainer action={createPropertyAction}>
          <ImageInput />
          <div className="grid md:grid-cols-2 gap-8 mb-4">
            <FormInput
              name="name"
              type="text"
              label="Name (30 limit)"
              defaultValue="Cabin in Egypt"
            />
            <FormInput
              name="tagline"
              type="text"
              label="Tagline (30 limit)"
              defaultValue="Dream Getaway Awaits You Here"
              required={true}
            />
            <FormInput
              label="Price ($)"
              name="price"
              defaultValue="100"
              type="number"
              min={0}
              required
            />
            <FormSelector
              items={categories}
              defaultValue={categories[0].label}
              name="category"
              renderItem={(i) => (
                <SelectItem key={i.label} value={i.label}>
                  <span className="flex items-center gap-2">
                    <i.icon /> {i.label}
                  </span>
                </SelectItem>
              )}
            />
          </div>
          <TextareaInput
            name="description"
            defaultValue="Write your rent description."
          />

          <div className="grid sm:grid-cols-2 gap-8 mb-4">
            <FormSelector
              name="country"
              items={formattedCountries}
              defaultValue={formattedCountries[0].code}
              renderItem={(i) => (
                <SelectItem key={i.code} value={i.code}>
                  <span className="flex items-center gap-2">
                    {i.flag} {i.name}
                  </span>
                </SelectItem>
              )}
            />
          </div>
          <h3 className="text-lg mt-8 mb-4 font-medium">
            Accommodation Details
          </h3>
          <CounterInput detail="guests" />
          <CounterInput detail="bedrooms" />
          <CounterInput detail="beds" />
          <CounterInput detail="baths" />
          <h3 className="text-lg mt-10 mb-6 font-medium">Amenities</h3>
          <AmenitiesInput />
          <SubmitButton text="create rental" className="mt-12" />
        </FormContainer>
      </div>
    </section>
  );
}
