import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function TextareaInput({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label?: string;
  defaultValue?: string;
}) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Textarea rows={5} required name={name} defaultValue={defaultValue} />
    </div>
  );
}
