"use client";

import { useEffect, useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import DeletePostButton from "./delete-post-button";
import PerformanceMonitor from "../performance-monitor";

interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
}

interface PostsClientProps {
  posts: Post[];
  fetchTime: number;
}

const PostsClient = ({ posts, fetchTime }: PostsClientProps) => {
  const [renderTime, setRenderTime] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startRender = performance.now();
    
    // Use requestAnimationFrame to measure after DOM updates
    requestAnimationFrame(() => {
      const endRender = performance.now();
      const renderDuration = endRender - startRender;
      setRenderTime(renderDuration);
      setTotalTime(fetchTime + renderDuration);
    });
  }, [posts, fetchTime]);

  return (
    <div className="flex flex-col gap-4">
      <PerformanceMonitor 
        fetchTime={fetchTime}
        renderTime={renderTime}
        totalTime={totalTime}
      />
      
      <aside ref={containerRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="group transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
          >
            <CardHeader>
              <CardTitle className="text-lg leading-6">{post.title}</CardTitle>
              <CardAction>
                <DeletePostButton id={post.id.toString()} />
              </CardAction>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-3">
                {post.content}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </aside>
    </div>
  );
};

export default PostsClient; 