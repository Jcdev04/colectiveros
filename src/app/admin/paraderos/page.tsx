"use client";
import { SelectOptions, SelectOptionsByParent } from "@/components/stops/select-options";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchAll } from "@/lib/fetchingBy";
import { useEffect, useState } from "react";

interface Place {
  _id: string;
  name: string;
}

export default function StopsPage(){
  const [countries, setCountries] = useState<Place[]>([]);
  const [country, setCountry] = useState<string>("");

  const [regions, setRegions] = useState<Place[]>([]);
  const [region, setRegion] = useState<string>("");
  
  const [provinces, setProvinces] = useState<Place[]>([]);
  const [province, setProvince] = useState<string>("");
  
  const [districts, setDistricts] = useState<Place[]>([]);
  const [district, setDistrict] = useState<string>("");
  
  const [localities, setLocalities] = useState<Place[]>([]);
  const [locality, setLocality] = useState<string>("");
  
  const [companies, setCompanies] = useState<Place[]>([]);
  const [company, setCompany] = useState<string>("");
  
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    address: "",
    reference: "",
    coordinates: {
      lat: 0,
      lng: 0
    },
    google_maps_url: "",
    phone: "",
    postal_code: "",
  })

  useEffect(()=>{
    async function initialLoad(){
      const [dataCountries, dataCompanies] = await Promise.all([
        fetchAll("countries"),
        fetchAll("companies")
      ])
      setCountries(dataCountries);
      setCompanies(dataCompanies);
    }
    initialLoad()
  },[])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
     e.preventDefault();
    setIsLoading(true);
    try {
      const countryName = getNameByIdInState(country, countries)
      const regionName = getNameByIdInState(region, regions)
      const provinceName = getNameByIdInState(province, provinces)
      const districtName = getNameByIdInState(district, districts)
      const localityName = getNameByIdInState(locality, localities)
      const companyName = getNameByIdInState(company, companies);
      const nameStop= `${companyName} - ${localityName}`
      const body = {
        ...formData,
        name: nameStop,
        locality: {
          locality_id: locality,
          locality_name: localityName
        },
        district: {
          district_id: district,
          district_name: districtName
        },
        province: {
          province_id: province,
          province_name: provinceName
        },
        region: {
          region_id: region,
          region_name: regionName
        },
        country: {
          country_id: country,
          country_name: countryName
        },
        company_id: company
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stops`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...body}),
      });
      const data = await response.json();
      if (data.status !== 201) throw new Error(data.error);
      setFormData({
        ...formData,
        address: "",
        reference: "",
        google_maps_url: "",
        phone: "",
        postal_code: "",
      });
      setCompany("")
    } catch (error) {
      console.error("Error creating station:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const getNameByIdInState = (id:string, state:Place[])=>{
    return state.find(element => element._id ==id)?.name
  }

  return (
     <div className="container mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold">Administrar Paraderos</h1>
        <p className="text-muted-foreground">Crea y administra paraderos</p>
      </div>
      <div className="mt-4 space-y-3">
        <Card>
          <CardHeader>
            <CardTitle>Añade paraderos</CardTitle>
            <CardDescription>Llena todos los campos</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectOptions name="País" options={countries} value={country} setValue={setCountry}/>  
                <SelectOptionsByParent name="Región" options={regions} setOptions={setRegions} value={region} setValue={setRegion} parentValue={country} endpoint={"regions"}/>  
                <SelectOptionsByParent name="Provincia" options={provinces} setOptions={setProvinces} value={province} setValue={setProvince} parentValue={region} endpoint={"provinces"}/>  
                <SelectOptionsByParent name="Distrito" options={districts} setOptions={setDistricts} value={district} setValue={setDistrict} parentValue={province} endpoint={"districts"}/>  
                <SelectOptionsByParent  name="Localidad" options={localities} setOptions={setLocalities} value={locality} setValue={setLocality} parentValue={district} endpoint={"localities"}/> 
              </div>
               {
                  ( locality &&
                    <div className="space-y-2">
               
              <div className="space-y-2">
                <SelectOptions name="Empresas de transporte" options={companies} value={company} setValue={setCompany}/>
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
                  <div className="space-y-2">
                    <Label htmlFor="phone">Número de celular</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postal_code">Código Postal</Label>
                    <Input
                      id="postal_code"
                      name="postal_code"
                      type="text"
                      value={formData.postal_code}
                      onChange={handleInputChange}
                      />
                  </div>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creando..." : "Crear Paradero"}
                  </Button>
                      </div>
                  )
                }
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            asda
          </CardContent>
        </Card>
      </div>
    </div>
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