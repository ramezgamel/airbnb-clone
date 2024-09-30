import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  min?: number;
  required?: boolean;
};
export default function FormInput({
  name,
  type,
  placeholder,
  defaultValue,
  label,
  className,
  min,
  required = false,
}: FormInputProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name}>{label || name}</Label>
      <Input
        placeholder={placeholder}
        defaultValue={defaultValue}
        id={name}
        name={name}
        type={type}
        className={className}
        min={min}
        required={required}
      />
    </div>
  );
}
