"use client";

import { usePathname } from "next/navigation";
import { CardSubmitButton } from "../form/buttons";
import { toggleFavoriteAction } from "@/actions/property";
import FormContainer from "../form/FormContainer";

export default function FavoriteToggleForm({
  favoriteId,
  propertyId,
}: {
  favoriteId: string | null;
  propertyId: string;
}) {
  const pathname = usePathname();
  const formAction = toggleFavoriteAction.bind(null, {
    propertyId,
    favoriteId,
    pathname,
  });

  return (
    <FormContainer action={formAction}>
      <CardSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  );
}
