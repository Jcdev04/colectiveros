// app/colectivero/page.tsx
"use client";

import { useCompany } from "@/context/CompanyContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ColectiveroIndex() {
  const { loading, company } = useCompany();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    console.log(company);
    router.push(company ? "/colectivero/inicio" : "/colectivero/onboarding");
  }, [loading, company, router]);

  return <p>Cargando…</p>;
}
