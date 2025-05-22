"use client";
// This component is used to display a card for a bus stop (paradero) with its name, address, destination, and fare.
import { StopsProvider } from "@/context/StopContext";
import { useParams } from "next/navigation";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { localityId } = useParams();
  return (
    <StopsProvider localityId={localityId as string}>{children}</StopsProvider>
  );
};

export default Layout;
