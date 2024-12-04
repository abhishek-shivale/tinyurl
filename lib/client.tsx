"use client";
import { deleteShortUrl } from "@/app/api/api_url";
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
import { useAuthorizedContext } from "@/hooks/use-authorise";
import { toast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

export const DeleteDialog = ({ value }: { value: string }) => {
  const {revalidateUserInfo} = useAuthorizedContext()

  if(!window) return null
  const handleDelete = async () => {
    try {
      await deleteShortUrl(value);
      toast({ title: "Deleted successfully", variant: "success" });
      await revalidateUserInfo();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error while deleting",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-gray-400 hover:text-red-600" title="Delete">
          <Trash2 size={20} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="px-4 py-2 text-white !bg-red-600 !hover:bg-red-700 rounded-md"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
