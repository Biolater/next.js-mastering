"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const createPost = async (prevState: any, formData: FormData) => {
    try {
        const title = formData.get("title");
        const content = formData.get("content");

        if (!title || !content) {
            return { success: false, error: "Title and content are required" };
        }

        await prisma.post.create({
            data: { title: title.toString(), content: content.toString() },
        });

        return { success: true, message: "Post created successfully" };

    } catch (error) {
        console.error("Error creating post:", error);
        return { success: false, error: "Failed to create post" };
    }
};