"use server";
import { db } from "@/server";
import { posts } from "../schema";
import { revalidatePath } from "next/cache";

export default async function insertPost(formData: FormData) {
  const title = formData.get("title")?.toString();
  if (title) {
    revalidatePath("/");
    const post = await db.insert(posts).values({
      title,
    });
    return { sucess: post };
  } else {
    console.log("Title is required");
  }
}
