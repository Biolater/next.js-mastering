import CreatePostForm from "@/components/forms/create-post-form";
import Posts from "@/components/posts/posts";
import { Suspense } from "react";
import GracefullyDegradingErrorBoundary from "../error";

const PostsIndex = () => {
  return (
    <main className="flex flex-col gap-4">
      <CreatePostForm />
      <h1 className="text-2xl font-bold">Posts</h1>
      <GracefullyDegradingErrorBoundary>
        <Suspense fallback={<div>Loading Posts...</div>}>
          <Posts />
        </Suspense>
      </GracefullyDegradingErrorBoundary>
    </main>
  );
};

export default PostsIndex;
