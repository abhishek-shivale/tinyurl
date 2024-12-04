"use server";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function getUserInfo() {
  const userId = (await headers()).get("x-userid");

  if (!userId) return;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      _count: {
        select: {
          shortUrls: true,
        },
      },
      profileImage: true,
      role: true,
      isVerified: true,
      name: true,
    },
  });
  return user;
}
