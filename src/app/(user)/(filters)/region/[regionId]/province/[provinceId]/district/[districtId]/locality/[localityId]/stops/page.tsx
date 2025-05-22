"use client";
import { ParaderoCard } from "@/components/cards/paradero-card";
import { useStops } from "@/context/StopContext";

const Stops = () => {
  const { stops, loading, error } = useStops();
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
