"use client";
import LoadingTable from "@/components/booking/LoadingTable";

export default function loading() {
  return (
    <div className="mt-16">
      <LoadingTable row={5} />
    </div>
  );
}
