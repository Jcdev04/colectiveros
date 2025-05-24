// context/CompanyContext.tsx
"use client";
import { useSession } from "next-auth/react";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useRef,
} from "react";
import { Company, CompanySchema } from "../db/company.schema"; // ajusta la ruta

type CompanyContextType = {
  loading: boolean;
  company: Company | null;
  setCompany: (company: Company) => void;
};

const CompanyContext = createContext<CompanyContextType>({
  loading: true,
  company: null,
  setCompany: () => {},
});

export function CompanyProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [company, _setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  // setter que a la vez quita el loading
  const setCompany = (c: Company) => {
    _setCompany(c);
    setLoading(false);
  };
  const didFetchRef = useRef(false);
  useEffect(() => {
    if (status === "loading") return;

    // 2) si ya hicimos el fetch, no volvemos a entrar
    if (didFetchRef.current) return;
    didFetchRef.current = true;

    const userId = session?.user?.id;
    if (!userId) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        console.log("Fetching company data...");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/companies/${userId}`
        );
        if (res.status === 404) {
          setLoading(false);
        } else {
          const { data: raw } = await res.json();
          const c = CompanySchema.parse(raw);
          setCompany(c);
        }
      } catch {
        setLoading(false);
      }
    })();
  }, [session, status]);

  const contextValue = React.useMemo(
    () => ({ loading, company, setCompany }),
    [loading, company, setCompany]
  );

  return (
    <CompanyContext.Provider value={contextValue}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  return useContext(CompanyContext);
}
