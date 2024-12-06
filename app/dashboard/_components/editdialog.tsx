"use client";
import { checkSlugAvailability, editShortUrl } from "@/app/api/api_url";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuthorizedContext } from "@/hooks/use-authorise";
import { useToast } from "@/hooks/use-toast";
import { Copy, Crown } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

export const EditDialog = ({
  shortUrl,
  originalUrl,
  isProtected,
  id,
}: {
  shortUrl: string;
  originalUrl: string;
  isProtected: boolean;
  id: string;
}) => {
  const [url, setUrl] = useState(originalUrl);
  const [customSlug, setCustomSlug] = useState(shortUrl);
  const [slugStatus, setSlugStatus] = useState("");
  const [slugTimeout, setSlugTimeout] = useState<NodeJS.Timeout | null>(null);
  const { info } = useAuthorizedContext();

  const userRole = info?.role || "FREE";

  const [passwordEnabled, setPasswordEnabled] = useState(isProtected);
  const [password, setPassword] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    if (slugTimeout) clearTimeout(slugTimeout);

    if (customSlug && customSlug !== shortUrl) {
      setSlugStatus("Checking availability...");
      const timeout = setTimeout(async () => {
        try {
          const isAvailable = await checkSlugAvailability(customSlug);
          setSlugStatus(
            isAvailable ? "Slug is available!" : "Slug is already taken."
          );
        } catch (error) {
          console.error("Error checking slug availability:", error);
          setSlugStatus("Error checking availability.");
        }
      }, 300);

      setSlugTimeout(timeout);
    } else {
      setSlugStatus("");
    }
  }, [customSlug, shortUrl]);

  const onClose = () => {
    (
      document.querySelector("[data-radix-dialog-close]") as HTMLElement
    )?.click();
  };

  const handleSubmit = async () => {
    if (!url) {
      toast({
        title: "URL is required",
        variant: "destructive",
      });
      return;
    }

    const editData: {
      url?: string | undefined;
      customSlug?: string | undefined;
      password?: string | undefined;
      passwordEnabled?: boolean | undefined;
    } = {
      ...(url !== originalUrl && { url }),
      ...(customSlug !== shortUrl && userRole === "PREMIUM" && { customSlug }),
    };

    if (passwordEnabled) {
      if (password) {
        editData.password = password;
        console.log(password);
      }
    }

    if (passwordEnabled !== isProtected) {
      if (passwordEnabled && password) {
        editData.passwordEnabled = true;
      } else if (passwordEnabled === false) {
        editData.passwordEnabled = false;
      }
    }

    if (Object.keys(editData).length > 0) {
      const data = {
        ...editData,
        id: id,
      };
      try {
        const res = await editShortUrl(data);
        if (res) {
          toast({
            title: "Short URL edited successfully",
            variant: "success",
          });
        }
      } catch (error) {
        console.error("Error editing short URL:", error);
        toast({
          title: "unable to edit short url",
          variant: "destructive",
        });
      } finally {
        onClose();
      }
    } else {
      toast({
        title: "No changes to be made",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    if (!shortUrl) {
      toast({ title: "No URL to copy.", variant: "destructive" });
      return;
    }
    navigator.clipboard.writeText(shortUrl).then(
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
    <div className="space-y-4">
      <div>
        <Label>Original URL</Label>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your long URL"
          className="mt-2"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label>Custom Slug</Label>
          {userRole !== "PREMIUM" && (
            <div className="flex items-center text-yellow-600 text-sm">
              <Crown className="mr-1 h-4 w-4" />
              Premium Feature
            </div>
          )}
        </div>
        <Input
          value={customSlug}
          onChange={(e) => setCustomSlug(e.target.value)}
          placeholder="Enter custom slug"
          className="mt-2"
          disabled={userRole !== "PREMIUM"}
        />
        {userRole !== "PREMIUM" && (
          <p className="my-2 text-sm text-muted-foreground">
            Upgrade to Premium to customize your slug
          </p>
        )}
        {slugStatus && (
          <p
            className={`mt-1 text-sm ${
              slugStatus.includes("available")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {slugStatus}
          </p>
        )}
      </div>

      <div>
        <Label>Full Short Link Preview</Label>
        <div className="flex gap-2 items-center py-2">
          <Input
            value={`${window.location.origin}/t/${customSlug}`}
            readOnly
            className="flex-1 focus:ring-2 focus:ring-primary/50 break-all"
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
      </div>

      <div className="flex items-center justify-between">
        <Label>Password Protection</Label>
        <Switch
          checked={passwordEnabled}
          onCheckedChange={(checked) => {
            setPasswordEnabled(checked);
            if (!checked) setPassword("");
          }}
        />
      </div>

      {passwordEnabled && (
        <div>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={isProtected ? "Change password" : "Set new password"}
            className="mt-2"
          />
        </div>
      )}

      <div className="flex justify-center">
        <QRCodeSVG
          size={128}
          value={`${window.location.origin}/t/${customSlug}`}
        />
      </div>

      <Button onClick={handleSubmit} className="w-full">
        Save Changes
      </Button>
    </div>
  );
};
