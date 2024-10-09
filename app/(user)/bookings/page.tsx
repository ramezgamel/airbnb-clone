import { DeleteBooking, fetchBookings } from "@/actions/Booking";
import CountryFlagAndName from "@/components/card/CountryFlagAndName";
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
import { formatCurrency, formatDate } from "@/utils/format";
import Link from "next/link";

export default async function BookingPage() {
  const bookings = await fetchBookings();
  if (bookings.length == 0) return <EmptyList />;
  return (
    <div className="mt-16">
      <h4 className="mb-4 capitalize">Total bookings: {bookings.length}</h4>
      <Table>
        <TableCaption>A list of your recent bookings</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Nights</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>CheckIn</TableHead>
            <TableHead>CheckOut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((b) => (
            <TableRow key={b.id}>
              <TableCell>
                <Link
                  className="underline text-muted-foreground tracking-wide"
                  href={`/properties/${b.property.id}`}
                >
                  {b.property.name}
                </Link>
              </TableCell>
              <TableCell>
                <CountryFlagAndName countryCode={b.property.country} />
              </TableCell>
              <TableCell>{b.totalNights}</TableCell>
              <TableCell>{formatCurrency(b.orderTotal)}</TableCell>
              <TableCell>{formatDate(b.checkIn)}</TableCell>
              <TableCell>{formatDate(b.checkOut)}</TableCell>
              <TableCell>
                <DeleteBookingButton bookingId={b.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function DeleteBookingButton({ bookingId }: { bookingId: string }) {
  const deleteBooking = DeleteBooking.bind(null, { bookingId });
  return (
    <FormContainer action={deleteBooking}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}
