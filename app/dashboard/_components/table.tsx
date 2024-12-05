import { getShortUrl } from "@/app/api/api_url";
import { getRelativeDate } from "@/lib/lib";
import { BarChart2, Edit, Lock, Trash2, Unlock } from "lucide-react";
import { Qrdialog } from "./actions";
import Clipboard from "./clipboard";
import { DeleteDialog } from "@/lib/client";
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
import { EditDialog } from "./editdialog";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

async function ShortLinkTable() {
  const links = await getShortUrl();

  return (
    <table className="w-full table-fixed">
      <thead className="bg-gray-50 border-b">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
            Original Link
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
            Short Link
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
            Clicks
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
            Created
          </th>
          <th className=" py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
            Protected
          </th>
          <th className="px-8 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {links.length === 0 ? (
          <tr>
            <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
              No links found
            </td>
          </tr>
        ) : (
          links.map((link) => (
            <tr key={link.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 truncate max-w-xs">
                  {link.originalUrl}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <a
                    href={`${process.env.NEXTAUTH_URL}/${link.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {link.slug}
                  </a>
                  <Clipboard link={link.slug} />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <BarChart2 size={16} />
                  {link.clicks}
                </div>
              </td>
              <td
                className="px-6 py-4 text-sm text-gray-500"
                title={new Date(link.createdAt).toLocaleDateString()}
              >
                {getRelativeDate(link.createdAt)}
              </td>
              <td className="px-4 py-4 text-sm text-gray-500">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  {link.isProtected ? (
                    <div title="Protected">
                      <Lock size={16} color="green" />
                    </div>
                  ) : (
                    <div title="Not protected">
                      <Unlock size={16} color="red" />
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end items-center gap-2">
                  <Qrdialog value={`${link.slug}`} />

                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        className="text-gray-400 hover:text-green-600"
                        title="Edit"
                      >
                        <Edit size={20} />
                      </button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Edit className="h-5 w-5" />
                          Edit Short Link
                        </DialogTitle>
                        <DialogDescription>
                          Modify your short link details
                        </DialogDescription>
                      </DialogHeader>
                      <EditDialog
                        originalUrl={link.originalUrl}
                        shortUrl={link.slug}
                        isProtected={link.isProtected}
                        id={link.id}
                      />
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        className="text-gray-400 hover:!text-red-600"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this item? This action
                          cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction className="px-4 py-2 text-white !bg-red-600 hover:!bg-red-700 rounded-md">
                          <DeleteDialog value={link.id} />
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default ShortLinkTable;
