"use server";
import bcrypt from "bcrypt";
import { generateSlug, UrlFormData } from "./lib";
import prisma from "./prisma";
import { ShortUrl } from "@prisma/client";
export async function getTinyUrl(data: UrlFormData) {
  const { url, customSlug, password, expireAt } = data;

  try {
    const slug = customSlug || generateSlug();

    if (slug) {
      const existing = await prisma.shortUrl.findUnique({ where: { slug } });
      if (existing) {
        return {
          message: "Slug already exists. Please choose a different one.",
          shortUrl: { slug: "" },
          success: false,
        };
      }
    }

    const shortUrl = await prisma.shortUrl.create({
      data: {
        originalUrl: url,
        slug,
        password: password ? await bcrypt.hash(password, 10) : null,
        expiresAt: expireAt ? new Date(expireAt) : null,
      },
    });

    return {
      message: "Short URL created successfully",
      shortUrl: { slug: shortUrl.slug },
      success: true,
    };
  } catch (error: unknown) {
    console.error("Error creating short URL:", error);

    return {
      message: "An error occurred while processing your request.",
      shortUrl: { slug: "" },
      success: false,
    };
  }
}

export const findShortUrl = async (slug: string) => {
  const shortUrl = await prisma.shortUrl.findUnique({
    where: {
      slug,
    },
  });
  return shortUrl;
};

export const checkPassword = async ({
  slug,
  password,
}: {
  slug: string;
  password: string;
}) => {
  const shortUrl = await prisma.shortUrl.findUnique({
    where: {
      slug,
    },
  });
  if (!shortUrl)
    return { message: "Short URL not found", success: false, originalUrl: "" };
  if (shortUrl.expiresAt && shortUrl.expiresAt < new Date())
    return {
      message: "Short URL has expired",
      originalUrl: "",
      success: false,
    };
  if (!shortUrl.password)
    return {
      message: "Short URL has no password",
      originalUrl: shortUrl.originalUrl,
      success: true,
    };
  const valid = await bcrypt.compare(password, shortUrl.password);
  if (!valid)
    return { message: "Wrong password", originalUrl: "", success: false };
  await addTrack(shortUrl);
  return {
    message: "Success",
    originalUrl: shortUrl.originalUrl,
    success: true,
  };
};

export const addTrack = async (shortUrl: ShortUrl) => {
  await prisma.shortUrl.update({
    where: { id: shortUrl.id },
    data: {
      clicks: { increment: 1 },
      lastClickedAt: new Date(),
    },
  });
};

export const checkSlugAvailability = async (slug: string) => {
  const shortUrl = await prisma.shortUrl.findUnique({
    where: {
      slug,
    },
  });
  return !shortUrl;
};