"use client";

/*import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Route, RouteSchema, Station as RouteStation } from "@/db/route.schema";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Place {
  _id: string;
  name: string;
}

interface Station extends Place {
  locality_id: string;
  region_id: string;
  province_id: string;
  district_id: string;
  country_id: string;
}
*/
export default function RoutesPage(){

  return (
    <h1>Rutas</h1>
  )
}

/*
export default function RoutesPage() {
  const [companies, setCompanies] = useState<Place[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedStations, setSelectedStations] = useState<RouteStation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    company_id: "",
    origin_id: "",
    destination_id: "",
    duration_minutes: 0,
    fare_pen: 0,
    schedule: {
      type: "fixed" as const,
      days: [] as string[],
      hours: {
        from: "",
        to: "",
      },
    },
  });

  const fetchPlaces = async (endpoint: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/${endpoint}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      return [];
    }
  };

  const fetchStationsByCompany = async (companyId: string) => {
    if (!companyId) return [];
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stations/?company_id=${companyId}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching stations:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      const companiesData = await fetchPlaces("companies");
      setCompanies(companiesData);
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    if (formData.company_id) {
      fetchStationsByCompany(formData.company_id).then(setStations);
    } else {
      setStations([]);
    }
    setFormData(prev => ({ ...prev, origin_id: "", destination_id: "" }));
    setSelectedStations([]);
  }, [formData.company_id]);

  const handleSelectChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleStationSelect = (stationId: string) => {
    const station = stations.find(s => s._id === stationId);
    if (!station) return;

    const newStation: RouteStation = {
      station_id: station._id,
      order: selectedStations.length,
    };

    setSelectedStations(prev => [...prev, newStation]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.company_id || !formData.origin_id || !formData.destination_id || selectedStations.length === 0) {
      toast.error("Por favor complete todos los campos requeridos");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/routes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          stations: selectedStations,
        }),
      });
      const data = await response.json();
      if (data.status !== 201) throw new Error(data.error);
      toast.success("Ruta creada exitosamente");
      // Reset form
      setFormData({
        company_id: "",
        origin_id: "",
        destination_id: "",
        duration_minutes: 0,
        fare_pen: 0,
        schedule: {
          type: "fixed",
          days: [],
          hours: {
            from: "",
            to: "",
          },
        },
      });
      setSelectedStations([]);
    } catch (error) {
      console.error("Error creating route:", error);
      toast.error("Error al crear la ruta");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold">Administrar Rutas</h1>
        <p className="text-muted-foreground">
          Crea y administra rutas en el sistema
        </p>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Crear Ruta</CardTitle>
            <CardDescription>
              Selecciona la empresa y configura la ruta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Empresa</Label>
                  <Select 
                    value={formData.company_id} 
                    onValueChange={(value) => handleSelectChange("company_id", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una empresa" />
                    </SelectTrigger>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company._id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Origen</Label>
                  <Select 
                    value={formData.origin_id} 
                    onValueChange={(value) => handleSelectChange("origin_id", value)}
                    disabled={!formData.company_id}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el origen" />
                    </SelectTrigger>
                    <SelectContent>
                      {stations.map((station) => (
                        <SelectItem key={station._id} value={station._id}>
                          {station.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Destino</Label>
                  <Select 
                    value={formData.destination_id} 
                    onValueChange={(value) => handleSelectChange("destination_id", value)}
                    disabled={!formData.company_id}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el destino" />
                    </SelectTrigger>
                    <SelectContent>
                      {stations.map((station) => (
                        <SelectItem key={station._id} value={station._id}>
                          {station.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Duración (minutos)</Label>
                  <Input
                    type="number"
                    name="duration_minutes"
                    value={formData.duration_minutes}
                    onChange={handleNumberChange}
                    required
                    min="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tarifa (PEN)</Label>
                  <Input
                    type="number"
                    name="fare_pen"
                    value={formData.fare_pen}
                    onChange={handleNumberChange}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              {formData.company_id && (
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Estaciones Intermedias</Label>
                    <Select 
                      onValueChange={handleStationSelect}
                      disabled={!formData.company_id}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una estación" />
                      </SelectTrigger>
                      <SelectContent>
                        {stations
                          .filter(station => 
                            station._id !== formData.origin_id && 
                            station._id !== formData.destination_id &&
                            !selectedStations.some(s => s.station_id === station._id)
                          )
                          .map((station) => (
                            <SelectItem key={station._id} value={station._id}>
                              {station.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedStations.length > 0 && (
                    <div className="space-y-2">
                      <Label>Orden de las Estaciones</Label>
                      <div className="border rounded-md p-4">
                        <ol className="list-decimal list-inside">
                          {selectedStations.map((station, index) => (
                            <li key={station.station_id} className="py-1">
                              {stations.find(s => s._id === station.station_id)?.name}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <Button type="submit" disabled={isLoading || !formData.company_id || !formData.origin_id || !formData.destination_id}>
                {isLoading ? "Creando..." : "Crear Ruta"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} */