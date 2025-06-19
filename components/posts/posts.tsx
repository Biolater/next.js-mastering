import {
  getPostsWithCache,
  getPostsFromAPIWithCache,
  getPostsFromAPI,
} from "@/lib/data/getPosts";
import PostsClient from "./posts-client";
import { notFound } from "next/navigation";

const Posts = async () => {
  const start = performance.now();
  const posts = await getPostsFromAPIWithCache();
  const end = performance.now();
  const fetchTime = end - start;



  return <PostsClient posts={posts.data || []} fetchTime={fetchTime} />;
};

export default Posts;
