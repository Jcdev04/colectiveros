"use client";

import { Button } from "@/components/ui/button";
import { useCompany } from "@/context/CompanyContext";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

const DashboardColectivero = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogOut = () => {
    signOut();
  };
  const { company } = useCompany();
  return isLoading ? (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  ) : (
    <div>
      <h1>Company</h1>
      <div>{company?.name}</div>
      <Button onClick={handleLogOut}>Log out</Button>
    </div>
  );
};

export default DashboardColectivero;
