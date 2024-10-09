import { Skeleton } from "../ui/skeleton";

export default function LoadingTable({ row }: { row?: number }) {
  const tableRows = Array.from({ length: row || 5 }, (_, i) => (
    <div className="mb-4" key={i}>
      <Skeleton className="w-full h-8 rounded" />
    </div>
  ));
  return <>{tableRows}</>;
}
