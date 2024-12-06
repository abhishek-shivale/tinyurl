"use client";
import { fontHeading } from "@/app/font";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import {
  BellIcon,
  CreditCardIcon,
  LockIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";
import Billing from "./_components/billing";
import Profileupdate from "./_components/profileupdate";
import Settings from "./_components/settings";

const SettingsPage = () => {
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
    <div className="container mx-auto px-4 py-8 md:w-[100vh]  space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h1
          className={`${fontHeading} text-3xl font-bold flex items-center gap-3`}
        >
          <SettingsIcon color="black" />
          Settings
        </h1>
      </div>
      <Card className="w-full ">
        <CardHeader>
          <CardTitle className="flex items-center tracking-wider">
            <UserIcon className="mr-3 text-black" />
            Profile Settings
          </CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <Profileupdate />
      </Card>

      {/* Notifications Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center tracking-wider">
            <BellIcon className="mr-3 text-black" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose how you want to receive updates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
                checked={notifications[key as keyof {
                  email: true,
                  push: false,
                  sms: false,
                  marketing: false,
                }]}
                onCheckedChange={() => handleNotificationToggle(key as keyof {
                  email: true,
                  push: false,
                  sms: false,
                  marketing: false,
                })}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCardIcon className="mr-3 text-black" />
            Subscription Details
          </CardTitle>
          <CardDescription>
            Manage your current plan and billing information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-blue-800">
                  {subscription.plan}
                </h3>
                <p className="text-blue-700 text-sm">
                  Next billing date: {subscription.nextBillingDate}
                </p>
              </div>
              <Button variant="outline">Change Plan</Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Storage Usage</h3>
            <Progress value={subscription.storageUsage} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2">
              {subscription.storageUsage}% of storage used
            </p>
          </div> */}

          <div className="space-y-4">
            <Billing />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <LockIcon className="mr-3 text-black" />
            Account Security
          </CardTitle>
          <CardDescription>
            Protect your account with advanced security settings
          </CardDescription>
        </CardHeader>
        <Settings />
      </Card>
    </div>
  );
};

export default SettingsPage;
