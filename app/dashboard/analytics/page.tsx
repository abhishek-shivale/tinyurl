import { fontHeading } from "@/app/font";

import Rendertopurls from "./_components/rendertopurls";
import { Suspense } from "react";
import Wrapper from "./_components/wrapper";
import { ChartNoAxesColumn } from "lucide-react";

// Mock data structure


const LinkTrackingDashboard = () => {

  return (
    <div className=" min-h-screen p-4 md:p-6 w-full flex justify-center">
      <div className="w-full lg:w-[800px] xl:w-[1000px] max-w-full">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">

            <div className="flex items-center gap-2">
            <ChartNoAxesColumn color="black" />
            <h1 className={`${fontHeading} text-2xl md:text-3xl font-bold text-gray-800`}>Link Performance</h1>
            </div>
          </div>


          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Clicks Trend</h2>
            </div>
            <Wrapper />
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <Rendertopurls />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default LinkTrackingDashboard;