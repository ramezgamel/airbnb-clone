import React from "react";
import { Card, CardHeader } from "../ui/card";

export default function StatsCard({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) {
  return (
    <Card className="bg-muted">
      <CardHeader className="flex justify-between items-center">
        <h3 className="capitalize text-3xl font-bold">{title}</h3>
        <span className="font-extrabold text-primary text-5xl">{value}</span>
      </CardHeader>
    </Card>
  );
}
