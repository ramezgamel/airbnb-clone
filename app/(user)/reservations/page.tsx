import { getReservations } from "@/actions/Booking";
import CountryFlagAndName from "@/components/card/CountryFlagAndName";
import EmptyList from "@/components/home/EmptyList";
import Stats from "@/components/reservations/Stats";
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

export default async function page() {
  const reservations = await getReservations();
  if (reservations.length == 0) return <EmptyList text="No reservations" />;
  return (
    <>
      <Stats />
      <div className="mt-16">
        <h4 className="mb-4 capitalize">
          Total reservations: {reservations.length}
        </h4>
        <Table>
          <TableCaption>A list of recent reservations</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Property Name</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Nights</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((res) => (
              <TableRow key={res.id}>
                <TableCell>
                  <Link
                    className="underline text-muted-foreground tracking-wide"
                    href={`/properties/${res.propertyId}`}
                  >
                    {res.property.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <CountryFlagAndName countryCode={res.property.country} />
                </TableCell>
                <TableCell>{res.totalNights}</TableCell>
                <TableCell>{formatCurrency(res.orderTotal)}</TableCell>
                <TableCell>{formatDate(res.checkIn)}</TableCell>
                <TableCell>{formatDate(res.checkOut)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
