import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

export default function RatingInput({
  name,
  label,
}: {
  name: string;
  label?: string;
}) {
  const numbers = Array.from({ length: 5 }, (_, i) => {
    return (i + 1).toString();
  }).reverse();
  return (
    <div>
      <Label htmlFor={name}>{label || name}</Label>
      <Select name={name} defaultValue="5" required>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {numbers.map((n) => (
            <SelectItem key={n} value={n}>
              {n}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
