"use client";
import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


interface AnalyticsData {
  date: string;
  clicks: number;
}
function Renderanalytics({data}:{data: AnalyticsData[]}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
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
  );
}

export default Renderanalytics;
