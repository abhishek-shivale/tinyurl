"use client";
import { useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Rendertopurls from "./_components/rendertopurls";

// Mock data structure
const mockLinkData = {
  overviewMetrics: {
    totalClicks: 45672,
    clickGrowth: 12.5,
  },
  dailyPerformance: [
    { date: "Mon", clicks: 3200 },
    { date: "Tue", clicks: 3600 },
    { date: "Wed", clicks: 4100 },
    { date: "Thu", clicks: 3900 },
    { date: "Fri", clicks: 4300 },
    { date: "Sat", clicks: 3700 },
    { date: "Sun", clicks: 4000 },
  ],
  topUrls: [
    {
      title: "Marketing Campaign",
      url: "https://example.com/marketing-campaign",
      clicks: 12453,
      conversionRate: 4.2,
    },
    {
      title: "Product Launch",
      url: "https://example.com/product-launch",
      clicks: 9876,
      conversionRate: 3.7,
    },
    {
      title: "Seasonal Promo",
      url: "https://example.com/seasonal-promo",
      clicks: 7521,
      conversionRate: 2.9,
    },
  ],
};

const LinkTrackingDashboard = () => {
  const [timeFilter, setTimeFilter] = useState("7d");


  const TimeFilterButtons = () => (
    <div className="flex space-x-2 bg-gray-100 rounded-full p-1 max-w-full overflow-x-auto">
      {["1d", "7d", "30d"].map((period) => (
        <button
          key={period}
          onClick={() => setTimeFilter(period)}
          className={`px-3 py-1 rounded-full text-sm transition-colors whitespace-nowrap ${
            timeFilter === period
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-200"
          }`}
        >
          {period}
        </button>
      ))}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6 w-full flex justify-center">
      <div className="w-full lg:w-[800px] xl:w-[1000px] max-w-full">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Link Performance</h1>
            <TimeFilterButtons />
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {renderMetricCard(
              "Total Clicks",
              mockLinkData.overviewMetrics.totalClicks.toLocaleString(),
              mockLinkData.overviewMetrics.clickGrowth,
              <BarChart2 className="text-blue-500" />
            )}
          </div> */}

          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Clicks Trend</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockLinkData.dailyPerformance}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ fontWeight: "bold" }}
                />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

            <Rendertopurls />
          {/* <Suspense fallback={<div>Loading...</div>}>
          </Suspense> */}
        </div>
      </div>
    </div>
  );
};

export default LinkTrackingDashboard;