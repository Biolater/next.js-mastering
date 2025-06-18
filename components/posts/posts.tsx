import {
  getPostsWithCache,
  getPostsFromAPIWithCache,
  getPostsFromAPI,
} from "@/lib/data/getPosts";
import PostsClient from "./posts-client";

interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
}

const Posts = async () => {
  const start = performance.now();
    const posts: Post[] = await getPostsFromAPIWithCache();
  const end = performance.now();
  const fetchTime = end - start;

  return <PostsClient posts={posts} fetchTime={fetchTime} />;
};

export default Posts;
