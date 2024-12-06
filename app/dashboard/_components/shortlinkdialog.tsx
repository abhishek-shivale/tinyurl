"use client";

import { checkSlugAvailability, getTinyUrl } from "@/app/api/api_url";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuthorizedContext } from "@/hooks/use-authorise";
import { useToast } from "@/hooks/use-toast";
import { UrlFormData, urlFormSchema } from "@/lib/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Copy,
  Crown,
  Link as LinkIcon,
  Lock,
  Plus,
  Settings,
  X,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

const initialState = {
  shortUrl: "",
  loading: false,
  slugStatus: "",
  advancedOptionsOpen: false,
  generateQr: false,
  enablePassword: false,
};

function ShortLinkDialog() {
  const [state, setState] = useState(initialState);
  const { toast } = useToast();
  const [slugTimeout, setSlugTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { info, revalidateUserInfo } = useAuthorizedContext();

  const userRole = info?.role || "FREE";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UrlFormData>({
    resolver: zodResolver(urlFormSchema),
  });

  const customSlug = watch("customSlug");

  useEffect(() => {
    if (slugTimeout) clearTimeout(slugTimeout);

    if (customSlug && userRole === "PREMIUM") {
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
  }, [customSlug, userRole]);

  const toggleAdvancedOptions = () => {
    setState((prev) => ({
      ...prev,
      advancedOptionsOpen: !prev.advancedOptionsOpen,
    }));
  };

  const toggleGenerateQr = () => {
    setState((prev) => ({
      ...prev,
      generateQr: !prev.generateQr,
    }));
  };

  const togglePasswordProtection = () => {
    setState((prev) => {
      const newEnablePassword = !prev.enablePassword;
      // Clear password when disabling
      if (!newEnablePassword) {
        setValue("password", "");
      }
      return {
        ...prev,
        enablePassword: newEnablePassword,
      };
    });
  };

  const onSubmit = async (data: UrlFormData) => {
    if (!data) {
      toast({ title: "Please fill all the fields.", variant: "destructive" });
      return;
    }
    try {
      if (
        info?._count?.shortUrls === 15 ||
        (info?._count.shortUrls as number) > 15
      ) {
        toast({
          title: "You have reached the limit, upgrade your plan.",
          variant: "destructive",
        });
        return;
      }

      // Validate custom slug for premium users
      if (data.customSlug && userRole !== "PREMIUM") {
        toast({
          title: "Custom slug is a premium feature.",
          variant: "destructive",
        });
        return;
      }

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
      await revalidateUserInfo();

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

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setState(initialState);
      reset();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 border-[rgb(238,228,226)]">
          <Plus className="h-4 w-4" />
          Create Short Link
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5" />
            Create Short Link
          </DialogTitle>
          <DialogDescription>
            Shorten your long URLs into manageable, shareable links
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              {...register("url")}
              placeholder="Enter your long URL"
              className="focus:ring-2 focus:ring-primary/50"
            />
            {errors.url && (
              <p className="text-red-500 mt-1 text-sm">{errors.url.message}</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <Label>Advanced Options</Label>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={toggleAdvancedOptions}
              className="text-muted-foreground hover:text-foreground"
            >
              {state.advancedOptionsOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Settings className="h-5 w-5" />
              )}
            </Button>
          </div>

          {state.advancedOptionsOpen && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <div className="flex items-center justify-between">
                  <Label>Custom Slug</Label>
                  {userRole !== "PREMIUM" && (
                    <div className="flex items-center text-yellow-600 text-sm py-2">
                      <Crown className="mr-1 h-4 w-4" />
                      Premium Feature
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 py-2">
                  <Input
                    {...register("customSlug")}
                    placeholder="Enter your custom slug (optional)"
                    className={cn(
                      "w-full",
                      userRole !== "PREMIUM" && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={userRole !== "PREMIUM"}
                  />
                  {userRole !== "PREMIUM" && (
                    <div
                      className="flex items-center gap-1 text-sm text-muted-foreground"
                      title="Premium Feature"
                    >
                      <Lock className="h-4 w-4" />
                    </div>
                  )}
                </div>
                {userRole !== "PREMIUM" && (
                  <p className="my-2 text-sm text-muted-foreground">
                    Upgrade to Premium to customize your slug
                  </p>
                )}
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

              <div className="flex items-center space-x-2">
                <Switch
                  id="password-protect"
                  checked={state.enablePassword}
                  onCheckedChange={togglePasswordProtection}
                />
                <Label htmlFor="password-protect">Password Protection</Label>
              </div>

              {state.enablePassword && (
                <div>
                  <Input
                    {...register("password")}
                    type="password"
                    placeholder="Enter your password"
                    className="w-full"
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="qr-code"
                  checked={state.generateQr}
                  onCheckedChange={toggleGenerateQr}
                />
                <Label htmlFor="qr-code">Generate QR Code</Label>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={state.loading}>
            {state.loading ? "Shortening..." : "Shorten URL"}
          </Button>
        </form>

        {state.shortUrl && (
          <div className="mt-4 space-y-4">
            <div className="flex gap-2 items-center">
              <Input
                value={state.shortUrl}
                readOnly
                className="flex-1 focus:ring-2 focus:ring-primary/50"
              />
              <Button
                variant="outline"
                className="shrink-0"
                size="icon"
                onClick={copyToClipboard}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            {state.generateQr && (
              <div className="flex gap-2 items-center justify-center">
                <QRCodeSVG size={128} value={state.shortUrl} />
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ShortLinkDialog;
