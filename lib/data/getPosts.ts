import { unstable_cache } from "next/cache";
import { prisma } from "../prisma";

type PostsResult = {
    success: boolean;
    data?: any[];
    error?: string;
};

export const getPostsWithCache = unstable_cache(
    async (): Promise<PostsResult> => {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc",
            },
        }).catch((err) => {
            console.error("Error fetching posts:", err);
            return null;
        });

        if (!posts) {
            return { success: false, error: "Failed to fetch posts" };
        }

        return { success: true, data: posts };
    },
    ["posts"],
    {
        revalidate: 60,
        tags: ["posts-tag"],
    }
);

export const getPosts = async (): Promise<PostsResult> => {
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: "desc",
        },
    }).catch((err) => {
        console.error("Error fetching posts:", err);
        return null;
    });

    if (!posts) {
        return { success: false, error: "Failed to fetch posts" };
    }

    return { success: true, data: posts };
}

export const getPostsFromAPI = async (): Promise<PostsResult> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=100")
        .catch((err) => {
            console.error("Error fetching posts from API:", err);
            return null;
        });

    if (!response) {
        return { success: false, error: "Failed to fetch posts from API" };
    }

    const data = await response.json().catch((err) => {
        console.error("Error parsing API response:", err);
        return null;
    });

    if (!data) {
        return { success: false, error: "Failed to parse API response" };
    }

    return { success: true, data };
}

export const getPostsFromAPIWithNativeCache = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=100", {
        next: {
            revalidate: 300,
        },
        cache: "force-cache",
    })

    const data = await response.json().catch((err) => {
        console.error("Error parsing API response:", err);
        return null;
    });

    if (!data) {
        return { success: false, error: "Failed to parse API response" };
    }

    return { success: true, data };
}

export const getPostsFromAPIWithCache = unstable_cache(
    async (): Promise<PostsResult> => {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=100")
            .catch((err) => {
                console.error("Error fetching posts from API:", err);
                return null;
            });

        if (!response) {
            return { success: false, error: "Failed to fetch posts from API" };
        }

        const data = await response.json().catch((err) => {
            console.error("Error parsing API response:", err);
            return null;
        });

        if (!data) {
            return { success: false, error: "Failed to parse API response" };
        }

        return { success: true, data };
    },
    ["posts-api"],
    {
        revalidate: 60,
        tags: ["posts-tag"],
    }
);