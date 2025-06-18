import { unstable_cache } from "next/cache";
import { prisma } from "../prisma";

export const getPostsWithCache = unstable_cache(
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
    ["posts"],
    {
        revalidate: 60,
        tags: ["posts-tag"],
    }
);

export const getPosts = async () => {
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
}

export const getPostsFromAPI = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=100");
        return response.json();
    } catch (err) {
        console.error("Error fetching posts from API:", err);
        return [];
    }
}

export const getPostsFromAPIWithCache = unstable_cache(
    async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=100");
            return response.json();
        } catch (err) {
            console.error("Error fetching posts from API:", err);
            return [];
        }
    },
    ["posts-api"],
    {
        revalidate: 60,
        tags: ["posts-tag"],
    }
);