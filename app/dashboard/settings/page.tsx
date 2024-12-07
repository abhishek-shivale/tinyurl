import { fontHeading } from "@/app/font";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BellIcon,
  LockIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import Billing from "./_components/billing";
import Profileupdate from "./_components/profileupdate";
import Settings from "./_components/settings";
import Notification from "./_components/notification";

const SettingsPage = () => {


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
          <Notification />
        </CardContent>
      </Card>

      <Billing />

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
