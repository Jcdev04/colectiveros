"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Stop = any; // ajusta tu tipo real aquí

interface StopsContextValue {
  stops: Stop[];
  loading: boolean;
  error: string | null;
  getStopById: (id: string) => any | undefined;
}

const StopsContext = createContext<StopsContextValue | undefined>(undefined);

export function StopsProvider({
  localityId,
  children,
}: Readonly<{
  localityId: string;
  children: ReactNode;
}>) {
  const [stops, setStops] = useState<Stop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/stops?localityId=${localityId}`
    )
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch stops");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setStops(data.data);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [localityId]);

  const getStopById = (id: string) => stops.find((s) => s._id === id);

  const contextValue = React.useMemo(
    () => ({ stops, loading, error, getStopById }),
    [stops, loading, error, getStopById]
  );

  return (
    <StopsContext.Provider value={contextValue}>
      {children}
    </StopsContext.Provider>
  );
}

export function useStops() {
  const ctx = useContext(StopsContext);
  if (!ctx) {
    throw new Error("useStops debe usarse dentro de <StopsProvider>");
  }
  return ctx;
}
