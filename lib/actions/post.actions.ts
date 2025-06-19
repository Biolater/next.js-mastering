"use server";

import { prisma } from "@/lib/prisma";

import { z } from "zod";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// Define validation schema
const createPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  content: z.string().min(1, "Content is required").max(1000, "Content too long"),
});

type FormState = {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  data?: {
    title?: string;
    content?: string;
  };
};

export const createPost = async (
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> => {
  const cookieStore = await cookies();
  
  const rawData = {
    title: formData.get("title"),
    content: formData.get("content"),
  };

  // Validate with Zod
  const validatedData = createPostSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      error: "Validation failed",
      fieldErrors: validatedData.error.flatten().fieldErrors,
      data: {
        title: rawData.title as string,
        content: rawData.content as string,
      },
    };
  }

  const result = await prisma.post.create({
    data: validatedData.data,
  }).catch((error) => {
    console.error("Error creating post:", error);
    return null;
  });

  if (!result) {
    return { success: false, error: "Failed to create post" };
  }

  cookieStore.set("post-created", "true");
  revalidateTag("posts-tag");

  return { success: true, message: "Post created successfully" };
};

export const deletePost = async (prevState: FormState | null, formData: FormData): Promise<FormState> => {
  const id = formData.get("id");
  const cookieStore = await cookies();

  if (!id) {
    return { success: false, error: "Post ID is required" };
  }

  if (typeof id !== "string") {
    return { success: false, error: "Invalid post ID" };
  }

  const result = await prisma.post.delete({
    where: {
      id,
    },
  }).catch((error) => {
    console.error("Error deleting post:", error);
    return null;
  });

  if (!result) {
    return { success: false, error: "Failed to delete post" };
  }

  revalidateTag("posts-tag");
  cookieStore.delete("post-created");
  return { success: true, message: "Post deleted successfully" };
}