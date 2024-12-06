"use client";
import React, { useState } from "react";
import type { ChangeEvent } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { TrashIcon, EyeIcon, EyeClosedIcon } from "lucide-react";
import Loader from "@/components/loader/loader";
import { updatePassword } from "@/app/api/api_user";

function Settings() {
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field: string) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]:
        !prev[
          field as keyof { current: boolean; new: boolean; confirm: boolean }
        ],
    }));
  };

  // const validateCurrentPassword = async (): Promise<boolean> => {
  //   setLoading(true);
  //   try {

  //     return true;
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: (error as Error).message,
  //       variant: "destructive",
  //     });
  //     return false;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const submitPasswordChange = async () => {
    if (!password.current || !password.new || !password.confirm) {
      toast({
        title: "All fields is required.",
        variant: "destructive",
      });
      return false;
    }
    if (password.new !== password.confirm) {
      toast({
        title: "New passwords do not match.",
        variant: "destructive",
      });
      return false;
    }

    setLoading(true);
    const data = {
      current:password.current,
    new:password.new,
    confirm:password.confirm,
    }
    try {
     await updatePassword(data);
      toast({
        title: "Password Changed",
        description: "Your password has been successfully updated.",
        variant: "success",
      });

      setPassword({
        current: "",
        new: "",
        confirm: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContent className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold">Change Password</h3>
        {["current", "new", "confirm"].map((field) => (
          <div className="relative" key={field}>
            <Input
              type={
                showPassword[
                  field as keyof {
                    current: boolean;
                    new: boolean;
                    confirm: boolean;
                  }
                ]
                  ? "text"
                  : "password"
              }
              name={field}
              value={
                password[
                  field as keyof {
                    current: boolean;
                    new: boolean;
                    confirm: boolean;
                  }
                ]
              }
              onChange={handlePasswordChange}
              placeholder={
                field === "current"
                  ? "Current Password"
                  : field === "new"
                  ? "New Password"
                  : "Confirm New Password"
              }
              className="mb-2"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility(field)}
              className="absolute right-2 top-2  text-gray-500 hover:text-gray-700"
            >
              {showPassword[
                field as keyof {
                  current: boolean;
                  new: boolean;
                  confirm: boolean;
                }
              ] ? (
                <EyeClosedIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        ))}
        <Button
          variant="secondary"
          className="w-full bg-gray-900 hover:bg-gray-900 text-white"
          onClick={submitPasswordChange}
          disabled={loading}
        >
          {loading ? <Loader color="black" /> : "Update Password"}
        </Button>
      </div>

      {/* Delete Account */}
      <div className="mt-6">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full bg-red-500">
              <TrashIcon className="mr-2 w-4 h-4" /> Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your account and cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-500 hover:bg-red-600">Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </CardContent>
  );
}

export default Settings;
