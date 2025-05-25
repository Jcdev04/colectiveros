"use client";

import {
  SelectOptions,
  SelectOptionsByParent,
  SelectOptionsByParentWithDescription,
} from "@/components/stops/select-options";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCompany } from "@/context/CompanyContext";
import toast from "react-hot-toast";

/**
 * Types into component
 */
interface Stop {
  _id: string;
  name: string;
  location: {
    address: string;
  };
}

export default function RoutesPage() {
  const { company, loading: loadingCompany } = useCompany();

  const [companies, setCompanies] = useState<Stop[]>([]);

  const [paraderosPuntoA, setParaderosPuntoA] = useState<Stop[]>([]);
  const [paraderoPuntoA, setParaderoPuntoA] = useState<string>("");

  const [paraderosPuntoB, setParaderosPuntoB] = useState<Stop[]>([]);
  const [paraderoPuntoB, setParaderoPuntoB] = useState<string>("");

  const [duration, setDuration] = useState<string>("0");
  const [farePen, setFarePen] = useState<string>("0");

  // 1) Si el contexto aún está cargando, muestra loader
  if (loadingCompany) return <div>Loading company…</div>;
  // 2) Si ya cargó pero no hay company, mensaje de error
  if (!company) return <div>No tienes empresa asociada.</div>;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Falta validar
    const body = {
      company_id: company._id,
      origin_id: paraderoPuntoA,
      destination_id: paraderoPuntoB,
      duration_minutes: parseInt(duration),
      fare_pen: parseFloat(farePen),
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/routes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...body }),
        }
      );
      const data = await response.json();
      setParaderoPuntoA("");
      setParaderoPuntoB("");
      setDuration("");
      setFarePen("");
      if (data.status === 201) {
        toast.success("Ruta creada correctamente");
      } else {
        toast.error("Error al crear la ruta");
      }
    } catch (e) {
      console.log(e);
      toast.error("Error al crear la ruta");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold">Administrar Rutas</h1>
        <p className="text-muted-foreground">Crea y administra rutas</p>
      </div>
      <div className="mt-4 space-y-3">
        <Card>
          <CardHeader>
            <CardTitle>Añade paraderos</CardTitle>
            <CardDescription>Llena todos los campos</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectOptionsByParentWithDescription
                  name="Punto de inicio"
                  options={paraderosPuntoA}
                  setOptions={setParaderosPuntoA}
                  endpoint="stops"
                  parentValue={company._id}
                  setValue={setParaderoPuntoA}
                  value={paraderoPuntoA}
                />
                <SelectOptionsByParentWithDescription
                  name="Punto de fin"
                  options={paraderosPuntoB}
                  setOptions={setParaderosPuntoB}
                  endpoint="stops"
                  parentValue={company._id}
                  setValue={setParaderoPuntoB}
                  value={paraderoPuntoB}
                />
                <div className="space-y-2">
                  <Label htmlFor="duration_minutes">
                    Duración (en minutos)
                  </Label>
                  <Input
                    id="duration_minutes"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fare_pen">Precio del pasaje (S/.)</Label>
                  <Input
                    id="fare_pen"
                    type="number"
                    value={farePen}
                    onChange={(e) => setFarePen(e.target.value)}
                  />
                </div>
              </div>
              <Button type="submit" className="mt-3">
                Crear Ruta
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
