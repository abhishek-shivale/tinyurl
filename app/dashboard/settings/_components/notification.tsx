"use client";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import React, { useState } from "react";

function Notification() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    marketing: false,
  });

  // const [subscription, _] = useState({
  //   plan: "Pro Plan",
  //   nextBillingDate: "July 15, 2024",
  //   storageUsage: 65,
  // });

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    toast({
      title: "Notification Settings",
      description: `${
        key.charAt(0).toUpperCase() + key.slice(1)
      } notifications ${notifications[key] ? "disabled" : "enabled"}.`,
      variant: "default",
    });
  };
  return (
    <>
      {[
        {
          key: "email",
          label: "Email Notifications",
          description: "Receive email updates about your account",
        },
        {
          key: "push",
          label: "Push Notifications",
          description: "Get instant alerts on your devices",
        },
        {
          key: "sms",
          label: "SMS Notifications",
          description: "Receive text message updates",
        },
        {
          key: "marketing",
          label: "Marketing Communications",
          description: "Opt-in to promotional emails and offers",
        },
      ].map(({ key, label, description }) => (
        <div key={key} className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{label}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Switch
            checked={
              notifications[
                key as keyof {
                  email: true;
                  push: false;
                  sms: false;
                  marketing: false;
                }
              ]
            }
            onCheckedChange={() =>
              handleNotificationToggle(
                key as keyof {
                  email: true;
                  push: false;
                  sms: false;
                  marketing: false;
                }
              )
            }
          />
        </div>
      ))}
    </>
  );
}

export default Notification;
