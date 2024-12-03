import { addTrack, findShortUrl } from "@/app/api/api_url";
import { redirect } from "next/navigation";
import PasswordProtection from "./passwordprotection";
async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const shortUrl = await findShortUrl(slug);
  if (!shortUrl) return redirect("/");

  if (shortUrl.expiresAt && shortUrl.expiresAt < new Date())
    return redirect("/");

  if (shortUrl.password) {
    return <PasswordProtection slug={slug} />;
  }
  await addTrack(shortUrl);
  redirect(shortUrl.originalUrl);
}

export default SlugPage;
