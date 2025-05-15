"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const Stops = () => {
  const { localityId } = useParams();

  useEffect(() => {
    const fetchStops = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/stops?localityId=${localityId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch stops");
      }
      const data = await response.json();
      console.log(data);
    };
    fetchStops();
  }, []);
  return <div>Todos los paraderos</div>;
};

export default Stops;
