"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { checkPassword } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { fontHeading } from "../font";
import { Toast } from "@/components/ui/toast";

const initialState = {
  password: "",
  loading: false,
};
function PasswordProtection({ slug }: { slug: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [state, setState] = useState(initialState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.password) return toast({ title: "Please enter password" });
    try {
      setState((prev) => ({
        ...prev,
        loading: true,
      }));
      const response = await checkPassword({
        slug: slug,
        password: state.password,
      });
      console.log(response.originalUrl);
      if (!response) return toast({ title: "Wrong password" });

      toast({ title: response.message, variant: "success" });
      router.push(response.originalUrl);
    } catch (error) {
      console.log(error);
      toast({ title: "Something went wrong", variant: "destructive" });
    } finally {
      setState((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <Toast />
      <Card className="w-full max-w-md mx-4 p-6">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h1 className={`${fontHeading} text-4xl font-semibold mb-2`}>
            Password Protected Link
          </h1>
          <p className="text-muted-foreground">
            This link is password protected. Please enter the password to
            continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            value={state.password}
            onChange={(e) =>
              setState((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="Enter password"
            required
          />
          <Button type="submit" className="w-full" disabled={state.loading}>
            {state.loading ? "Verifying..." : "Continue"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default PasswordProtection;
