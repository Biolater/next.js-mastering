"use client";

import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const SortingButtons = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  function updateSorting(sortOrder: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sortOrder);
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex gap-2">
      <Button onClick={() => updateSorting("asc")}>Sort Ascending</Button>
      <Button onClick={() => updateSorting("desc")}>Sort Descending</Button>
    </div>
  );
};

export default SortingButtons;
