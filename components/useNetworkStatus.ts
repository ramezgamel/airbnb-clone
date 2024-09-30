"use client";
import { useEffect } from "react";
import { useToast } from "./hooks/use-toast";

export default function useNetworkStatus() {
  const { toast } = useToast();
  useEffect(() => {
    const updateNetworkStatus = () => {
      if (navigator.onLine) {
        toast({
          description: "🟢 You are online",
        });
      } else {
        toast({
          description: "🔴 You are offline",
        });
      }
    };

    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    updateNetworkStatus();

    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, []);
}
