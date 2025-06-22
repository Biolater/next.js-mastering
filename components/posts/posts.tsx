import {
  getPostsWithCache,
  getPostsFromAPIWithCache,
  getPostsFromAPI,
  getPostsFromAPIWithNativeCache,
} from "@/lib/data/getPosts";
import PostsClient from "./posts-client";

export const revalidate = 300;

const Posts = async () => {
  const start = performance.now();
  const posts = await getPostsFromAPIWithNativeCache();
  const end = performance.now();
  const fetchTime = end - start;



  return <PostsClient posts={posts.data || []} fetchTime={fetchTime} />;
};

export default Posts;
