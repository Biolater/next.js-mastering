"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";

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
};

export const createPost = async (
  prevState: FormState | null, 
  formData: FormData
): Promise<FormState> => {
  try {
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
      };
    }

    await prisma.post.create({
      data: validatedData.data,
    });

    return { success: true, message: "Post created successfully" };

  } catch (error) {
    console.error("Error creating post:", error);
    return { success: false, error: "Failed to create post" };
  }
};