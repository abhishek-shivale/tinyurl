import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export const Qrdialog = ({ value }: { value: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-gray-100 transition-all focus:outline-none focus:ring focus:ring-blue-300"
          title="QR Code"
        >
          <QrCode size={20} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <DialogTitle className="text-lg font-semibold text-gray-700">
            QR Code
          </DialogTitle>
        </div>
        <div className="flex flex-col items-center gap-4 mt-4">
          <div className="p-4 bg-gray-50 rounded-md border border-[rgb(238,228,226)]">
            <QRCodeSVG value={`${process.env.NEXTAUTH_URL}/t/${value}`} />
          </div>
          <p className="text-sm text-gray-500 text-center">
            Scan this QR code to view details.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

