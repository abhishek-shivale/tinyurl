"use client";
import { toast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import React from "react";

function Clipboard({ link }: { link: string }) {
  const copyToClipboard = () => {
    if (!navigator) return;
    if (!link) {
      toast({ title: "No URL to copy.", variant: "destructive" });
      return;
    }
    const shortUrl = `${window.location.origin}/${link}`;
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
    <Copy
      size={16}
      className="text-gray-400 cursor-pointer hover:text-gray-600"
      onClick={copyToClipboard}
    />
  );
}

export default Clipboard;
