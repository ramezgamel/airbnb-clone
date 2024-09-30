"use client";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { actionFunction } from "@/utils/types";
import { useToast } from "../hooks/use-toast";
const initialState = {
  message: "",
};

export default function FormContainer({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) {
  const [state, formAction] = useFormState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message != "") {
      toast({
        description: state.message,
      });
    }
  }, [state]);
  return (
    <form className="p-2 rounded-md" action={formAction}>
      {children}
    </form>
  );
}
