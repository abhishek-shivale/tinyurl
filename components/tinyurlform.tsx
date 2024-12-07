"use client";
import { UrlFormData, urlFormSchema } from "@/lib/lib";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";
import { getTinyUrl, checkSlugAvailability } from "@/app/api/api_url";
import { Toaster } from "./ui/toaster";

const initialState = {
  shortUrl: "",
  loading: false,
  slugStatus: "",
};

function TinyLinkForm() {
  const [state, setState] = useState(initialState);
  const { toast } = useToast();
  const [slugTimeout, setSlugTimeout] = useState<NodeJS.Timeout | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<UrlFormData>({
    resolver: zodResolver(urlFormSchema),
  });

  const customSlug = watch("customSlug");

  useEffect(() => {
    if (slugTimeout) clearTimeout(slugTimeout);

    if (customSlug) {
      setState((prev) => ({ ...prev, slugStatus: "Checking availability..." }));
      const timeout = setTimeout(async () => {
        try {
          const isAvailable = await checkSlugAvailability(customSlug);
          setState((prev) => ({
            ...prev,
            slugStatus: isAvailable
              ? "Slug is available!"
              : "Slug is already taken.",
          }));
        } catch (error) {
          console.error("Error checking slug availability:", error);
          setState((prev) => ({
            ...prev,
            slugStatus: "Error checking availability.",
          }));
        }
      }, 300);

      setSlugTimeout(timeout);
    } else {
      setState((prev) => ({ ...prev, slugStatus: "" }));
    }
  }, [customSlug]);

  const onSubmit = async (data: UrlFormData) => {
    try {
      setState((prev) => ({
        ...prev,
        loading: true,
      }));

      const response = await getTinyUrl(data);

      if (!response) {
        toast({ title: "No response from server.", variant: "destructive" });
        return;
      }

      if (!response.success) {
        toast({
          title: response.message || "Failed to create short URL.",
          variant: "destructive",
        });
        return;
      }

      const shortUrl = `${window.location.origin}/t/${response.shortUrl.slug}`;
      setState((prev) => ({
        ...prev,
        shortUrl,
      }));

      toast({
        title: response.message || "Short URL created successfully!",
        variant: "success",
      });

      reset();
    } catch (error: unknown) {
      console.error("Error creating short URL:", error);
      if (error instanceof Error)
        toast({
          title: error.message || "An unexpected error occurred.",
          variant: "destructive",
        });
    } finally {
      setState((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  const copyToClipboard = () => {
    if (!state.shortUrl) {
      toast({ title: "No URL to copy.", variant: "destructive" });
      return;
    }
    navigator.clipboard.writeText(state.shortUrl).then(
      () => {
        toast({
          title: "Copied to clipboard!",
          variant: "success",
        });
      },
      (err) => {
        console.error("Clipboard copy failed:", err);
        toast({
          title: "Failed to copy.",
          variant: "destructive",
        });
      }
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-2">
      <Toaster />
      <Card className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input {...register("url")} placeholder="Enter your long URL" />
            {errors.url && (
              <p className="text-red-500 mt-1 text-sm">{errors.url.message}</p>
            )}
          </div>
          <div>
            <Input
              {...register("customSlug")}
              placeholder="Enter your custom slug (optional)"
              className="w-full"
            />
            {state.slugStatus && (
              <p
                className={`mt-1 text-sm ${
                  state.slugStatus.includes("available")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {state.slugStatus}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("password")}
              type="password"
              placeholder="Enter your password (optional)"
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full" disabled={state.loading}>
            {state.loading ? "Shortening..." : "Shorten URL"}
          </Button>
        </form>
      </Card>
      {state.shortUrl && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex gap-2 items-center">
              <Input value={state.shortUrl} readOnly className="flex-1" />
              <Button
                variant="outline"
                className="shrink-0"
                size="icon"
                onClick={copyToClipboard}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <QRCodeSVG size={128} value={state.shortUrl} />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default TinyLinkForm;
