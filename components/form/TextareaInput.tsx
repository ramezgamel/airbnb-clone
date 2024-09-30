import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function TextareaInput({ name }: { name: string }) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {name}
      </Label>
      <Textarea
        rows={5}
        required
        name={name}
        defaultValue={"Write your rent description."}
      />
    </div>
  );
}
