import { getPost } from "@/lib/data/getPost";
import { notFound } from "next/navigation";
import React, { FC } from "react";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const post = await getPost(id);
  return {
    title: post.data.title,
    description: post.data.body,
  };
};

const PostPage: FC<{ params: Promise<{ id: string }> }> = async ({
  params,
}) => {
  const { id } = await params;
  const post = await getPost(id);
  if (post.status === 404 && !post.success) {
    notFound();
  }
  if (!post.success) {
    return <div>Error: {post.error}</div>;
  }
  return (
    <div>
      <h1 className="text-2xl font-bold">{post.data.title}</h1>
      <p className="text-sm text-gray-500">{post.data.body}</p>
    </div>
  );
};

export default PostPage;
