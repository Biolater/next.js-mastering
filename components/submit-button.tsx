"use client";

import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export function SubmitButton({ isPending }: { isPending: boolean }) {

  return (
    <Button type="submit" disabled={isPending}>
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating...
        </>
      ) : (
        "Submit"
    )}
    </Button>
  );
}
