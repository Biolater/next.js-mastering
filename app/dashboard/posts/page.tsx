import CreatePostForm from "@/components/forms/create-post-form";
import Posts from "@/components/posts/posts";
import { ErrorBoundary } from "@/components/error-boundary";
import { Suspense } from "react";

const PostsIndex = () => {
  return (
    <main className="flex flex-col gap-4">
      <CreatePostForm />
      <h1 className="text-2xl font-bold">Posts</h1>
      <ErrorBoundary fallback={<div>Error loading posts</div>}>
        <Suspense fallback={<div>Loading Posts...</div>}>
        <Posts />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
};

export default PostsIndex;
