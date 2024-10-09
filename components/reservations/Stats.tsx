import { getReservationsStats } from "@/actions/Booking";
import StatsCard from "../admin/StatsCard";
import { formatCurrency } from "@/utils/format";

export default async function Stats() {
  const stats = await getReservationsStats();
  return (
    <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatsCard title="properties" value={stats.properties} />
      <StatsCard title="nights" value={stats.nights} />
      <StatsCard title="amount" value={formatCurrency(stats.amount ?? 0)} />
    </div>
  );
}
