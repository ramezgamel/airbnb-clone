import React from "react";
import { Card, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function loading() {
  return <Card></Card>;
}

export function ChartsLoadingContainer() {
  return <Skeleton className="mt-16 w-full rounded h-[300px]" />;
}
export function LoadingCard() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="w-full rounded h-20" />
      </CardHeader>
    </Card>
  );
}
export function StatusLoadingContainer() {
  return (
    <div className="mt-8 grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
    </div>
  );
}
