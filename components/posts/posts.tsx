import { getPosts } from "@/lib/data/getPosts";

const Posts = async () => {
  const posts = await getPosts();
  return (
    <div className="flex flex-wrap gap-4">
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default Posts;
