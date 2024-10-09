import { getRentalDetails, updateProperty } from "@/actions/property";
import AmenitiesInput from "@/components/form/AmenitiesInput";
import { SubmitButton } from "@/components/form/buttons";
import CounterInput from "@/components/form/CounterInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import FormSelector from "@/components/form/FormSelector";
import TextareaInput from "@/components/form/TextareaInput";
import { SelectItem } from "@/components/ui/select";
import { categories } from "@/utils/categories";
import { formattedCountries } from "@/utils/countries";
import { redirect } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  const property = await getRentalDetails(params.id);
  if (!property) redirect("/");
  const defaultAmenities = JSON.parse(property.amenities);
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4 capitalize">Edit Rental</h1>
      <div className="border p-8 rounded-md">
        {/* image edit */}
        <FormContainer action={updateProperty}>
          <input type="hidden" name="id" value={property.id} />
          <div className="grid md:grid-cols-2 gap-8 mt-8 mb-4">
            <FormInput
              name="name"
              type="text"
              label="Name (20 limit)"
              defaultValue={property.id}
            />
            <FormInput
              name="tagline"
              type="text"
              label="Tagline (30 limit)"
              defaultValue={property.tagline}
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
          <TextareaInput
            name="description"
            defaultValue="Write your rent description."
          />
          <h3 className="text-lg mt-8 mb-4 font-medium">
            Accommodation Details
          </h3>
          <CounterInput detail="guests" defaultValue={property.guests} />
          <CounterInput detail="bedrooms" defaultValue={property.bedrooms} />
          <CounterInput detail="beds" defaultValue={property.beds} />
          <CounterInput detail="baths" defaultValue={property.baths} />
          <h3 className="text-lg mt-10 mb-6 font-medium">Amenities</h3>
          <AmenitiesInput defaultValue={defaultAmenities} />
          <SubmitButton text="update rental" className="mt-12" />
        </FormContainer>
      </div>
    </section>
  );
}
