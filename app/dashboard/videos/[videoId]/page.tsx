/* import { getVideoById } from "@/lib/data/getVideos";
 */
const Video = async ({ params }: { params: Promise<{ videoId: string }> }) => {
  const { videoId } = await params;
  /*   const video = await getVideoById(parseInt(videoId));
   */ return (
    <div>
      {/*       <h1>Video {videoId}</h1>
      <h1>{video?.title}</h1>
      <p>{video?.description}</p> */}
    </div>
  );
};

export default Video;
