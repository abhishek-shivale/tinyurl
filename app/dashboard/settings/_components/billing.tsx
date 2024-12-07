"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import React from "react";

import { UpgradeSubscription } from "@/app/api/api_user";
import { useAuthorizedContext } from "@/hooks/use-authorise";
import { toast } from "@/hooks/use-toast";
import { CreditCardIcon } from "lucide-react";

const SubscriptionSettings = () => {
  const userInfo = useAuthorizedContext();

  const subscriptionData = {
    planType: userInfo?.info?.role ?? "FREE",
    currentPlan:
      userInfo?.info?.role === "FREE" ? "Basic Plan" : "Premium Plan",
    linksCreated: userInfo?.info?._count.shortUrls ?? 0,
    maxLinks: userInfo?.info?.role === "FREE" ? 15 : Infinity,
    features: {
      free: [
        "Create up to 15 short links",
        "Basic analytics",
        "Standard link management",
      ],
      premium: [
        "Unlimited short links",
        "Advanced analytics",
        "Custom domain",
        "Link groups",
        "Priority support",
      ],
    },
  };

  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = React.useState(false);

  const handleUpgrade = async () => {
    if (subscriptionData.planType === "FREE") {
      try {
        await UpgradeSubscription();
        await userInfo?.revalidateUserInfo();
        setIsUpgradeDialogOpen(false);
        toast({
          title: "Plan upgraded successfully",
          description: "You can now create unlimited short links.",
          variant: "success",
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Plan upgrade failed",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    }
  };


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCardIcon className="mr-3" />
            Subscription Details
          </CardTitle>
          <CardDescription>
            Manage your current plan and billing information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold  flex items-center">
                  {subscriptionData.currentPlan}
                  {subscriptionData.planType === "FREE" && (
                    <Badge variant="secondary" className="ml-2">
                      Free Tier
                    </Badge>
                  )}
                </h3>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Link Creation</h4>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-black h-2.5 rounded-full"
                style={{
                  width: `${
                    subscriptionData.planType === "FREE"
                      ? (subscriptionData.linksCreated /
                          subscriptionData.maxLinks) *
                        100
                      : 100
                  }%`,
                }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {subscriptionData.planType === "FREE"
                ? `${subscriptionData.linksCreated} / ${subscriptionData.maxLinks} links created`
                : "Unlimited links available"}
            </p>
          </div>

          <Separator />

          {/* <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-4 flex items-center">
                {subscriptionData.planType === "FREE" && (
                  <>
                    Current Plan Features
                    <Badge variant="outline" className="ml-2">
                      Free
                    </Badge>
                  </>
                )}
                {subscriptionData.planType === "PREMIUM" && (
                  <>Free Plan Features</>
                )}
              </h4>
            </div>
            <div>
              <h4 className="font-semibold mb-4 flex items-center">
                {subscriptionData.planType === "PREMIUM" && (
                  <>
                    Current Plan Features
                    <Badge variant="outline" className="ml-2">
                      Premium
                    </Badge>
                  </>
                )}
                {subscriptionData.planType === "FREE" && (
                  <>Premium Plan Features</>
                )}
                <Crown className="ml-2 text-yellow-500" />
              </h4>
            </div>
          </div> */}

          <div className="flex space-x-4">
            <Button
              className="w-full"
              onClick={() => setIsUpgradeDialogOpen(true)}
              disabled={subscriptionData.planType === "PREMIUM"}
            >
              {subscriptionData.planType === "PREMIUM"
                ? "Current Plan"
                : "Upgrade to Pro"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isUpgradeDialogOpen} onOpenChange={setIsUpgradeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upgrade to Pro</DialogTitle>
            <DialogDescription>
              Unlock unlimited link creation and advanced features
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>Pro Plan: $9.99/month</p>
            <Button className="w-full" onClick={handleUpgrade}>
              Confirm Upgrade
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscriptionSettings;