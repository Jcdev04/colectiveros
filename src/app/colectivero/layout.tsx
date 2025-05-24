import { CompanyProvider } from "@/context/CompanyContext";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <CompanyProvider>{children}</CompanyProvider>;
};

export default layout;
