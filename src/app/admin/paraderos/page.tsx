"use client";
/*import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Station, StationSchema } from "@/db/station.schema";
import { useEffect, useState } from "react";

interface Place {
  _id: string;
  name: string;
}
*/

export default function StopsPage(){
  return (
    <h1>StopsPage</h1>
  )
}
/*
export default function StationsPage() {
  const [countries, setCountries] = useState<Place[]>([]);
  const [regions, setRegions] = useState<Place[]>([]);
  const [provinces, setProvinces] = useState<Place[]>([]);
  const [districts, setDistricts] = useState<Place[]>([]);
  const [localities, setLocalities] = useState<Place[]>([]);
  const [companies, setCompanies] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    country_id: "",
    region_id: "",
    province_id: "",
    district_id: "",
    locality_id: "",
    company_id: "",
    //name: "",
    address: "",
    reference: "",
    coordinates: { lat: 0, lng: 0 },
    google_maps_url: "",
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
      console.log(`${process.env.NEXT_PUBLIC_APP_URL}/api/${endpoint}/${parentId}`);
      //set as a query param
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/${endpoint}/?idReq=${parentId}`);
      console.log(response);
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

  const handleSelectChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.locality_id) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...formData}),
      });
      const data = await response.json();
      if (data.status !== 201) throw new Error(data.error);
      setFormData({
        ...formData,
        //name: "",
        address: "",
        reference: "",
        google_maps_url: "",
      });
    } catch (error) {
      console.error("Error creating station:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormEnabled = !!formData.locality_id;

  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold">Administrar Paraderos</h1>
        <p className="text-muted-foreground">
          Crea y administra paraderos en el sistema
        </p>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Crear Paradero</CardTitle>
            <CardDescription>
              Selecciona la ubicación y completa los datos del paradero
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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


                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reference">Referencia</Label>
                    <Input
                      id="reference"
                      name="reference"
                      value={formData.reference}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="google_maps_url">URL de Google Maps</Label>
                    <Input
                      id="google_maps_url"
                      name="google_maps_url"
                      type="url"
                      value={formData.google_maps_url}
                      onChange={handleInputChange}
                    />
                  </div>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creando..." : "Crear Paradero"}
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
*/