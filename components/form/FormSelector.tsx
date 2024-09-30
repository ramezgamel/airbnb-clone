import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { IconType } from "react-icons";

export default function FormSelector<T>({
  name,
  items,
  defaultValue,
  renderItem,
}: {
  name: string;
  items: T[];
  defaultValue: string;
  renderItem: (item: T) => JSX.Element;
}) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {name}
      </Label>
      <Select name={name} required defaultValue={defaultValue}>
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="w-full">
          {items.map(
            (i) => renderItem(i)
            // <SelectItem key={i.label} value={i.label}>
            //   <span className="flex items-center gap-2">
            //     <i.icon /> {i.label}
            //   </span>
            // </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
