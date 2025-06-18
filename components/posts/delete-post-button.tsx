"use client";

import { Loader2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useActionState, useEffect } from "react";
import { deletePost } from "@/lib/actions/post.actions";
import { toast } from "sonner";

const DeletePostButton = ({ id }: { id: string }) => {
  const [state, formAction, isPending] = useActionState(deletePost, null);

  useEffect(() => {
    if (state?.success === false) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        size="icon"
        variant="destructive"
        className="opacity-0 group-hover:opacity-100 transition-opacity"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Trash2 className="size-4" />
        )}
      </Button>
    </form>
  );
};

export default DeletePostButton;
