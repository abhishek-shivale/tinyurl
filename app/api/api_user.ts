"use server";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import bcrypt from "bcrypt";

export async function getUserInfo() {
  const userId = (await headers()).get("x-userid");

  if (!userId) return null;

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
  console.log(user);
  return user;
}
interface PasswordFormData {
  current: string;
  new: string;
  confirm: string;
}
export async function updatePassword(data: PasswordFormData) {
  const userId = (await headers()).get("x-userid");
  if (!userId) throw new Error("Unauthorized");

  if (data.new !== data.confirm) throw new Error("Passwords do not match");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      password: true,
    },
  });

  if (!user) throw new Error("User not found");

  if (user.password) {
    const compare = await bcrypt.compare(data.current, user.password);
    if (!compare) throw new Error("Current password is incorrect");
  }

  const hashedPassword = await bcrypt.hash(data.new, 10);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
    },
  });

  return { message: "Password updated successfully", success: true };
}

interface updateProfile {
  name: string | null;
  email: string | null;
}

export async function updateProfile(data: updateProfile) {
  const userId = (await headers()).get("x-userid");
  if (!userId) throw new Error("Unauthorized");

  if(data.name == null && data.email == null) throw new Error("No data provided");

  if (data.email && data.name) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        email: data.email,
        isVerified: false,
      },
    });

  }
  if (data.name) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
      },
    });
  }

  if (data.email) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        email: data.email,
        isVerified: false,
      },
    });
  }

  return { message: "Profile updated successfully", success: true };
}

export const UpgradeSubscription = async () => {
  const userId = (await headers()).get("x-userid");
  if (!userId) throw new Error("Unauthorized");
  await prisma.user.update({
    where: { id: userId },
    data: {
      role: "PREMIUM",
    },
  });
  return { message: "Plan upgraded successfully", success: true };
};

export const deleteAccount = async () => {
  const userId = (await headers()).get("x-userid");
  if (!userId) throw new Error("Unauthorized");
  await prisma.user.delete({
    where: { id: userId },
  });
  return { message: "Account deleted successfully", success: true };
};


export const getUserInfoCheck = async (email: string) =>
  {
    const user = await prisma.user.findUnique({
      where: { email: email },});

    if (!user) {
      return false;
    }
    return true;
  }