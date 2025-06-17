import { unstable_cache } from "next/cache";
import { prisma } from "../prisma";

export const getPosts = unstable_cache(
    async () => {
        try {
            const posts = await prisma.post.findMany({
                orderBy: {
                    createdAt: "desc",
                },
            });
            return posts;
        } catch (err) {
            console.error("Error fetching posts:", err);
            return [];
        }
    },
    ["posts"], // Cache key - unique identifier
    {
        revalidate: 60, // Time-based: revalidate every 60 seconds
        tags: ["posts-tag"], // Tag-based: can be invalidated on-demand
    }
);