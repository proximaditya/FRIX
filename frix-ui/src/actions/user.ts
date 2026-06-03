"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function syncAndGetUser() {
  try {
    const { userId } = await auth();
    if (!userId) return null;

    const user = await currentUser();
    if (!user) return null;

    const dbUser = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {}, 
      create: {
        clerkId: userId,
        username: user.firstName || "Anonymous",
        eloRating: 1200, 
      },
    });
    
    return dbUser;
  } catch (error) {
    console.error("DB Error:", error);
    return null;
  }
}