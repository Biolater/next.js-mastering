import { getPostById } from "@/lib/data/getPosts";

const Video = async ({ params }: { params: Promise<{ videoId: string }> }) => {
  const { videoId } = await params;
  const post = await getPostById(parseInt(videoId));
  return (
    <div>
      <h1>Video {videoId}</h1>
      <h1>{post?.title}</h1>
      <p>{post?.content}</p>
    </div>
  );
};

export default Video;
