"use client";

import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";

const SortingButtons = () => {
  const searchParams = useSearchParams();
  function updateSorting(sortOrder: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sortOrder);
    window.history.pushState(null, "", `?${params.toString()}`);
  }

  return (
    <div className="flex gap-2">
      <Button onClick={() => updateSorting("asc")}>Sort Ascending</Button>
      <Button onClick={() => updateSorting("desc")}>Sort Descending</Button>
    </div>
  );
};

export default SortingButtons;
