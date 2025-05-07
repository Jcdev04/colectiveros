"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import sampleRoutes from "@/data/sample-routes.json";

interface Place {
  _id: string;
  name: string;
}

interface Station {
  station_id: string;
  name: string;
  address: string;
  reference: string;
  order: number;
}

interface Route {
  _id: string;
  company_id: string;
  company_name: string;
  origin_id: string;
  origin_name: string;
  destination_id: string;
  destination_name: string;
  stations: Station[];
  duration_minutes: number;
  fare_pen: number;
  schedule: {
    type: string;
    days: string[];
    hours: {
      from: string;
      to: string;
    };
  };
}

export default function RoutesPage() {
  const [countries, setCountries] = useState<Place[]>([]);
  const [regions, setRegions] = useState<Place[]>([]);
  const [provinces, setProvinces] = useState<Place[]>([]);
  const [districts, setDistricts] = useState<Place[]>([]);
  const [localities, setLocalities] = useState<Place[]>([]);
  const [companies, setCompanies] = useState<Place[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
  const [formData, setFormData] = useState({
    country_id: "",
    region_id: "",
    province_id: "",
    district_id: "",
    locality_id: "",
    company_id: "",
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

  const fetchPlacesByParent = async (endpoint: string, parentId: string) => {
    if (!parentId) return [];
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/${endpoint}/?idReq=${parentId}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      return [];
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      const [countriesData, companiesData] = await Promise.all([
        fetchPlaces("countries"),
        fetchPlaces("companies"),
      ]);
      setCountries(countriesData);
      setCompanies(companiesData);
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    if (formData.country_id) {
      fetchPlacesByParent("regions", formData.country_id).then(setRegions);
    } else {
      setRegions([]);
    }
    setFormData(prev => ({ ...prev, region_id: "", province_id: "", district_id: "", locality_id: "" }));
  }, [formData.country_id]);

  useEffect(() => {
    if (formData.region_id) {
      fetchPlacesByParent("provinces", formData.region_id).then(setProvinces);
    } else {
      setProvinces([]);
    }
    setFormData(prev => ({ ...prev, province_id: "", district_id: "", locality_id: "" }));
  }, [formData.region_id]);

  useEffect(() => {
    if (formData.province_id) {
      fetchPlacesByParent("districts", formData.province_id).then(setDistricts);
    } else {
      setDistricts([]);
    }
    setFormData(prev => ({ ...prev, district_id: "", locality_id: "" }));
  }, [formData.province_id]);

  useEffect(() => {
    if (formData.district_id) {
      fetchPlacesByParent("localities", formData.district_id).then(setLocalities);
    } else {
      setLocalities([]);
    }
    setFormData(prev => ({ ...prev, locality_id: "" }));
  }, [formData.district_id]);

  useEffect(() => {
    // Filter routes based on selected filters
    const filtered = sampleRoutes.routes.filter(route => {
      if (formData.company_id && route.company_id !== formData.company_id) return false;
      // Add more filters as needed
      return true;
    });
    setFilteredRoutes(filtered);
  }, [formData]);

  const handleSelectChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const formatSchedule = (schedule: Route["schedule"]) => {
    const days = schedule.days.join(", ");
    return `${days} de ${schedule.hours.from} a ${schedule.hours.to}`;
  };

  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold">Buscar Rutas</h1>
        <p className="text-muted-foreground">
          Encuentra las rutas disponibles según tu ubicación
        </p>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Filtros de Búsqueda</CardTitle>
            <CardDescription>
              Selecciona los criterios para encontrar rutas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>País</Label>
                <Select value={formData.country_id} onValueChange={(value) => handleSelectChange("country_id", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un país" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country._id} value={country._id}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Región</Label>
                <Select 
                  value={formData.region_id} 
                  onValueChange={(value) => handleSelectChange("region_id", value)}
                  disabled={!formData.country_id}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una región" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region._id} value={region._id}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Provincia</Label>
                <Select 
                  value={formData.province_id} 
                  onValueChange={(value) => handleSelectChange("province_id", value)}
                  disabled={!formData.region_id}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((province) => (
                      <SelectItem key={province._id} value={province._id}>
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Distrito</Label>
                <Select 
                  value={formData.district_id} 
                  onValueChange={(value) => handleSelectChange("district_id", value)}
                  disabled={!formData.province_id}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un distrito" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district._id} value={district._id}>
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Localidad</Label>
                <Select 
                  value={formData.locality_id} 
                  onValueChange={(value) => handleSelectChange("locality_id", value)}
                  disabled={!formData.district_id}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una localidad" />
                  </SelectTrigger>
                  <SelectContent>
                    {localities.map((locality) => (
                      <SelectItem key={locality._id} value={locality._id}>
                        {locality.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRoutes.map((route) => (
            <Card 
              key={route._id} 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => setSelectedRoute(route)}
            >
              <CardHeader>
                <CardTitle>{route.company_name}</CardTitle>
                <CardDescription>
                  {route.origin_name} → {route.destination_name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Duración:</strong> {route.duration_minutes} minutos</p>
                  <p><strong>Tarifa:</strong> S/ {route.fare_pen.toFixed(2)}</p>
                  <p><strong>Horario:</strong> {formatSchedule(route.schedule)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedRoute && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Detalles de la Ruta</CardTitle>
              <CardDescription>
                {selectedRoute.origin_name} → {selectedRoute.destination_name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Estaciones</h3>
                  <ol className="list-decimal list-inside mt-2">
                    {selectedRoute.stations.map((station) => (
                      <li key={station.station_id} className="py-1">
                        <div>
                          <strong>{station.name}</strong>
                          <p className="text-sm text-gray-600">{station.address}</p>
                          <p className="text-sm text-gray-500">{station.reference}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold">Información Adicional</h3>
                  <div className="mt-2 space-y-2">
                    <p><strong>Empresa:</strong> {selectedRoute.company_name}</p>
                    <p><strong>Duración:</strong> {selectedRoute.duration_minutes} minutos</p>
                    <p><strong>Tarifa:</strong> S/ {selectedRoute.fare_pen.toFixed(2)}</p>
                    <p><strong>Horario:</strong> {formatSchedule(selectedRoute.schedule)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 