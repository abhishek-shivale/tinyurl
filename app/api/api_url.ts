"use server";
import { ShortUrl } from "@prisma/client";
import bcrypt from "bcrypt";
import { headers } from "next/headers";
import { generateSlug, UrlFormData } from "../../lib/lib";
import prisma from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export const checkUser = async () => {
  const userId = (await headers()).get("x-userid");

  if (!userId) {
    return {
      message: "Unauthorized",
      shortUrl: { slug: "" },
      success: false,
    };
  }
  return userId;
};
export async function getTinyUrl(data: UrlFormData) {
  const { url, customSlug, password, expireAt } = data;

  const userId = await checkUser();

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

    const user = await prisma.user.findUnique({
      where: { id: userId as string },
      select: {
        _count: {
          select: {
            shortUrls: true,
          },
        },
      },
    });
    if (!user) {
      return {
        message: "User not found",
        shortUrl: { slug: "" },
        success: false,
      };
    }

    if (user?._count?.shortUrls === 15 || user?._count?.shortUrls > 15) {
      return {
        message: "You have reached the limit, upgrade your plan.",
        shortUrl: { slug: "" },
        success: false,
      };
    }

    const shortUrl = await prisma.shortUrl.create({
      data: {
        originalUrl: url,
        slug,
        password: password ? await bcrypt.hash(password, 10) : null,
        expiresAt: expireAt ? new Date(expireAt) : null,
        userId: userId as string,
      },
    });
    revalidatePath("/dashboard");
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

export const getShortUrl = async () => {
  const userId = await checkUser();
  if (!userId) throw new Error("Unauthorized");

  const shortUrls = await prisma.shortUrl.findMany({
    where: {
      userId: userId as string,
    },
    select: {
      clicks: true,
      originalUrl: true,
      slug: true,
      id: true,
      createdAt: true,
      password: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const urls = shortUrls.map((url) => ({
    ...url,
    isProtected: url.password ? true : false,
    password: undefined,
  }));

  return urls;
};

export const deleteShortUrl = async (id: string) => {
  if (!id) throw new Error("id not found");
  const res = await prisma.shortUrl.delete({
    where: {
      id: id,
    },
    select: {
      id: true,
    },
  });
  if (!res) throw new Error("Delete failed");
  revalidatePath("/dashboard");
  return { message: "Deleted successfully", success: true };
};

interface editShortUrl {
  id: string;
  customSlug?: string | undefined;
  url?: string | undefined;
  password?: string | undefined;
  passwordEnabled?: boolean | undefined;
}
export const editShortUrl = async (data: editShortUrl) => {
  const user = await checkUser();
  if (!user) throw new Error("Unauthorized");

  const shortUrl = await prisma.shortUrl.update({
    where: {
      id: data.id,
    },
    data: {
      ...(data.customSlug && { slug: data.customSlug }),
      ...(data.url && { originalUrl: data.url }),
    },
  });

  if (data.password || data.passwordEnabled) {
    if (data.password && data.passwordEnabled) {
      await prisma.shortUrl.update({
        where: {
          id: data.id,
        },
        data: {
          password: await bcrypt.hash(data.password, 10),
        },
      });
    }
  }

  if (data.passwordEnabled == false) {
    console.log("here");
    await prisma.shortUrl.update({
      where: {
        id: data.id,
      },
      data: {
        password: "",
      },
    });
  }
  if (!shortUrl) throw new Error("Edit failed");
  revalidatePath("/dashboard");
  return true;
};

export const getAnalytics = async () => {
  const userId = await checkUser();
  if (!userId) throw new Error("Unauthorized");
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 6 + i);
    return {
      date: date.toLocaleString("en-US", { weekday: "short" }),
      fullDate: date,
    };
  });

  const dailyPerformance = await Promise.all(
    days.map(async (day) => {
      const clicksCount = await prisma.shortUrl.aggregate({
        where: {
          userId: userId as string,
          lastClickedAt: {
            gte: new Date(day.fullDate.setHours(0, 0, 0, 0)),
            lt: new Date(day.fullDate.setHours(23, 59, 59, 999)),
          },
        },
        _sum: {
          clicks: true,
        },
      });

      return {
        date: day.date,
        clicks: clicksCount._sum.clicks || 0,
      };
    })
  );

  const topLinks = await prisma.shortUrl.findMany({
    where: {
      userId: userId as string,
      lastClickedAt: {
        gte: sevenDaysAgo,
      },
    },
    orderBy: {
      clicks: "desc",
    },
    take: 3,
    select: {
      originalUrl: true,
      clicks: true,
    },
  });

  const formattedTopLinks = topLinks.map((link) => ({
    title: link.originalUrl.split("/")[2] || "Unnamed Link",
    url: link.originalUrl,
    clicks: link.clicks,
  }));

  const totalAnalytics = await prisma.shortUrl.aggregate({
    where: {
      userId: userId as string,
    },
    _sum: {
      clicks: true,
    },
    _count: {
      id: true,
    },
  });

  return {
    dailyPerformance,
    topLinks: formattedTopLinks,
    totalClicks: totalAnalytics._sum.clicks || 0,
    totalUrls: totalAnalytics._count.id || 0,
  };
};


export const getTopUrls = async () => {
  const userId = await checkUser();
  if (!userId) throw new Error("Unauthorized");
  const topUrls = await prisma.shortUrl.findMany({
    where: {
      userId: userId as string,
    },
    orderBy: {
      clicks: "desc",
    },
    take: 3,
    select: {
      originalUrl: true,
      clicks: true,
    },
  });
  return topUrls;
}