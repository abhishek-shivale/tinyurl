"use client";
import { deleteShortUrl } from "@/app/api/api_url";
import { useAuthorizedContext } from "@/hooks/use-authorise";
import { toast } from "@/hooks/use-toast";

export const DeleteDialog = ({ value }: { value: string }) => {
  const { revalidateUserInfo } = useAuthorizedContext();

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
    <>
      <span onClick={handleDelete}>Delete</span>
    </>
  );
};

