"use client";

import { useEffect, useState } from "react";

const DashboardColectivero = () => {
  const [isLoading, setIsLoading] = useState(false);

  return isLoading ? (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  ) : (
    <div>DashboardColectivero</div>
  );
};

export default DashboardColectivero;
