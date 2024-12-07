import { getTopUrls } from "@/app/api/api_url";
import { Link2 } from "lucide-react";

async function Rendertopurls() {
  const topUrls = await getTopUrls();
  if(!topUrls) return;
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mt-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-2 md:space-y-0">
        <h2 className="text-xl font-semibold">Top Performing URLs</h2>
        {/* <button className="text-blue-500 hover:bg-blue-50 p-2 rounded-full transition-colors">
          <Download size={20} />
        </button> */}
      </div>
      <div className="space-y-4">
        {topUrls.map((urlData, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4 mb-2 md:mb-0 w-full md:w-auto">
              <div className="bg-blue-100 p-2 rounded-full">
                <Link2 className="text-black" size={20} />
              </div>
              <div className="flex-grow overflow-hidden">
                {/* <p className="font-semibold text-gray-800 truncate">
                  {urlData.originalUrl}
                </p> */}
                <p className=" text-gray-500 truncate max-w-full">
                  {urlData.originalUrl}
                </p>
              </div>
            </div>
            <div className="text-right w-full md:w-auto">
              <div className="font-bold text-gray-800">
                {urlData.clicks.toLocaleString()} Clicks
              </div>
              {/* <div className="text-sm text-gray-500">
                {urlData.conversionRate}% Conv.
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rendertopurls;
