"use client";
import { useState } from "react";



function FilterSection() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search links..."
          className="w-full px-4 py-2 border border-[rgb(238,228,226)] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </>
  );
}

export default FilterSection;
