"use client";
import { ParaderoCard } from "@/components/cards/paradero-card";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Stops = () => {
  const { localityId } = useParams();
  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchStops = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/stops?localityId=${localityId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch stops");
      }
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }
      setStops(data.data);
      setLoading(false);
    };
    fetchStops();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Todos los paraderos</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(() => {
            if (error) {
              return <p className="text-red-500">{error}</p>;
            } else if (stops.length === 0) {
              return (
                <p className="text-gray-500">No hay paraderos disponibles</p>
              );
            } else {
              return stops.map((stop: any) => (
                <ParaderoCard key={stop._id} paradero={stop} />
              ));
            }
          })()}
        </div>
      )}
    </div>
  );
};

export default Stops;
