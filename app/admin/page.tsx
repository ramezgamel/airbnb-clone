import ChartsContainer from "@/components/admin/ChartsContainer";
import {
  ChartsLoadingContainer,
  StatusLoadingContainer,
} from "@/components/admin/loading";
import StatsContainer from "@/components/admin/StatsContainer";
import { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense fallback={<StatusLoadingContainer />}>
        <StatsContainer />
      </Suspense>
      <Suspense fallback={<ChartsLoadingContainer />}>
        <ChartsContainer />
      </Suspense>
    </div>
  );
}
