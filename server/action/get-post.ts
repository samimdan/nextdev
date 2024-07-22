"use server";
import { db } from "@/server";

export default async function getPosts() {
  const posts = db.query.posts.findMany();
  return posts;
}
