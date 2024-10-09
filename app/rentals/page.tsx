import { deleteRental, getUserRentals } from "@/actions/property";
import { IconButton } from "@/components/form/buttons";
import FormContainer from "@/components/form/FormContainer";
import EmptyList from "@/components/home/EmptyList";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils/format";
import Link from "next/link";

export default async function RentalsPage() {
  const rentals = await getUserRentals();
  if (rentals.length == 0) return <EmptyList heading="No rentals to display" />;
  return (
    <div className="mt-16">
      <h3 className="mb-4 capitalize">Active Properties: {rentals.length}</h3>
      <Table>
        <TableCaption>A list of all your properties.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Nightly Rate</TableHead>
            <TableHead>Nights Booked</TableHead>
            <TableHead>Total Income</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rentals.map((r) => (
            <TableRow key={r.id}>
              <TableCell>
                <Link
                  className="underline text-muted-foreground tracking-wide"
                  href={`/properties/${r.id}`}
                >
                  {r.name}
                </Link>
              </TableCell>
              <TableCell>{formatCurrency(r.price)}</TableCell>
              <TableCell>{r.totalNightsSum || 0}</TableCell>
              <TableCell>{formatCurrency(r.orderTotalSum ?? 0)}</TableCell>
              <TableCell className="flex items-center gap-x-2">
                <Link href={`rentals/${r.id}/edit`}>
                  <IconButton actionType="edit" />
                </Link>
                <DeleteRental propertyId={r.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function DeleteRental({ propertyId }: { propertyId: string }) {
  const deleteBtn = deleteRental.bind(null, { propertyId });
  return (
    <FormContainer action={deleteBtn}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}
