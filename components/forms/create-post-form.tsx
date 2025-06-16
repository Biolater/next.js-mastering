"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/lib/actions/post.actions";
import { SubmitButton } from "@/components/submit-button";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const CreatePostForm = () => {
  const [state, formAction] = useActionState(createPost, null);

  useEffect(() => {
    console.log(state);
    if (state?.success) {
      toast.success(state.message);
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
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="Enter post title" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Enter post content"
            />
          </div>
          <SubmitButton />
    </form>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
