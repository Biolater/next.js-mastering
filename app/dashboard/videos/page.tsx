import Link from "next/link";

const Videos = () => {
  return (
    <div>
      <Link href="/dashboard/videos/1">Video 1</Link>
      <Link href="/dashboard/videos/2">Video 2</Link>
      <Link href="/dashboard/videos/3">Video 3</Link>
      <Link href="/dashboard/videos/4">Video 4</Link>
      <Link href="/dashboard/videos/5">Video 5</Link>
      <Link href="/dashboard/videos/6">Video 6</Link>
      <Link href="/dashboard/videos/7">Video 7</Link>
      <Link href="/dashboard/videos/8">Video 8</Link>
      <h1 className="text-2xl font-bold mb-4">Videos</h1>
      <p>Manage your videos here.</p>
    </div>
  );
};

export default Videos;
