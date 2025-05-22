"use client";

import {
  SelectOptions,
  SelectOptionsByParent,
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
import { fetchAll } from "@/lib/fetchingBy";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * Types into component
 */
interface Item {
  _id: string;
  name: string;
}

export default function RoutesPage() {
  const [companies, setCompanies] = useState<Item[]>([]);
  const [company, setCompany] = useState<string>("");

  const [paraderosPuntoA, setParaderosPuntoA] = useState<Item[]>([]);
  const [paraderoPuntoA, setParaderoPuntoA] = useState<string>("");

  const [paraderosPuntoB, setParaderosPuntoB] = useState<Item[]>([]);
  const [paraderoPuntoB, setParaderoPuntoB] = useState<string>("");

  const [duration, setDuration] = useState<string>("0");
  const [farePen, setFarePen] = useState<string>("0");

  useEffect(() => {
    const initialLoad = async () => {
      try {
        const data = await fetchAll("companies");
        setCompanies(data);
      } catch (error) {
        console.log(error);
      }
    };
    initialLoad();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Falta validar
    const body = {
      company_id: company,
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
      setCompany("");
      setParaderoPuntoA("");
      setParaderoPuntoB("");
      setDuration("");
      setFarePen("");
    } catch (e) {
      console.log(e);
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
              <SelectOptions
                name="Empresas de Transporte"
                options={companies}
                value={company}
                setValue={setCompany}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectOptionsByParent
                  name="Punto de inicio"
                  options={paraderosPuntoA}
                  setOptions={setParaderosPuntoA}
                  endpoint="stops"
                  parentValue={company}
                  setValue={setParaderoPuntoA}
                  value={paraderoPuntoA}
                />
                <SelectOptionsByParent
                  name="Punto de fin"
                  options={paraderosPuntoB}
                  setOptions={setParaderosPuntoB}
                  endpoint="stops"
                  parentValue={company}
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
