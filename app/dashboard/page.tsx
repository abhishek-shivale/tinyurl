import { LinkIcon } from "lucide-react";
import { Suspense } from "react";
import { fontHeading } from "../font";
import ShortLinkDialog from "./_components/shortlinkdialog";
import ShortLinkTable from "./_components/table";

export default function LinksDashboard() {
  return (
    <div className="container mx-auto px-4 py-8 w-full">
      <div className="flex justify-between items-center mb-8">
        <h1
          className={`${fontHeading} text-3xl font-bold flex items-center gap-3`}
        >
          <LinkIcon className="text-blue-600" />
          Your Links
        </h1>
        <ShortLinkDialog />
      </div>

      {/* <FilterSection /> */}
      <div className="bg-white shadow rounded-lg overflow-hidden ">
        <Suspense fallback={<div>Loading...</div>}>
          <ShortLinkTable />
        </Suspense>
      </div>
    </div>
  );
}
