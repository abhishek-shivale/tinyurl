"use client";
import { updateProfile } from "@/app/api/api_user";
import Loader from "@/components/loader/loader";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthorizedContext } from "@/hooks/use-authorise";
import { toast } from "@/hooks/use-toast";
import React from "react";
import type { ChangeEvent } from "react";
function Profileupdate() {
  const userInfo = useAuthorizedContext();
  const [loading, setLoading] = React.useState(false);
  const [profile, setProfile] = React.useState({
    name: userInfo?.info?.name ?? "",
    email: userInfo?.info?.email ?? "",
  });

  const handleclick = async () => {
    if (
      profile.name === userInfo?.info?.name &&
      profile.email === userInfo?.info?.email
    ) {
     return toast({
        title: "No changes made",
        description: "No changes made to the profile",
        variant: "destructive",
      });
    }

    const data = {
      name: profile.name,
      email: profile.email,
    };

    try {
      setLoading(true);
      await updateProfile(data);
      await userInfo?.revalidateUserInfo();
      toast({ title: "Profile updated successfully", variant: "success" });
    } catch (error) {
      console.log(error);
      toast({ title: "Unable to update profile", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };
  const handleProfileUpdate = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <CardContent className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Full Name</Label>
          <Input
            name="name"
            value={profile.name}
            onChange={handleProfileUpdate}
            placeholder="Enter your full name"
          />
        </div>
        <div className="">
          <Label>Email</Label>
          <Input
            name="email"
            value={profile.email}
            onChange={handleProfileUpdate}
            placeholder="Your email address"
          />
        </div>
      </div>
      <Button
        onClick={handleclick}
        className="w-full bg-gray-900 hover:bg-gray-900"
      >
        {loading ? <Loader /> : "Save Profile"}
      </Button>
    </CardContent>
  );
}

export default Profileupdate;
