"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/lib/actions/post.actions";
import { SubmitButton } from "@/components/submit-button";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

const CreatePostForm = () => {
  const [state, formAction, isPending] = useActionState(createPost, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      formRef.current?.reset(); // Reset form after success
    } else if (state?.success === false) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter post title"
              defaultValue={state?.data?.title || ""}
              className={state?.fieldErrors?.title ? "border-red-500" : ""}
            />
            {state?.fieldErrors?.title && (
              <p className="text-sm text-red-500">
                {state.fieldErrors.title[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Enter post content"
              defaultValue={state?.data?.content || ""}
              className={state?.fieldErrors?.content ? "border-red-500" : ""}
            />
            {state?.fieldErrors?.content && (
              <p className="text-sm text-red-500">
                {state.fieldErrors.content[0]}
              </p>
            )}
          </div>
          <SubmitButton isPending={isPending} />
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
