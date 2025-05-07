"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Country } from "@/db/country.schema";
import { Region } from "@/db/region.schema";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function CountriesList() {
  const [formData, setFormData] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFormValid(e.target.value.length > 0);
    setFormData(e.target.value);
  };    

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoadingData(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/countries`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
      );
      const data = await response.json();
      setCountries(data);
      setIsLoadingData(false);
    };
    fetchCountries();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/countries`, {
            method: "POST",
            body: JSON.stringify({ name: formData }),
        });
        const data = await response.json();
        if(data.status!==201){
          throw new Error(data.error);
        }
        setCountries([...countries, data.data]);
    } catch (error) {
        console.error("Error creating country:", error);
    } finally {
        setFormData("");
        setIsLoading(false);
    }
};
   
  return (
    <>
     <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Create Country</CardTitle>
          <CardDescription>Add a new country to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="country-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Country Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="ej: Peru"
                value={formData}
                onChange={handleChange}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" form="country-form" disabled={!isFormValid || isLoading} className="w-full">
            {isLoading ? "Creating..." : "Create country"}
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Countries</CardTitle>
          <CardDescription>List of all countries in the system</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingData ? (
            <div className="flex justify-center py-8">
              <p>Loading countries...</p>
            </div>
          ) : (
            //create a table with country ID and name, id mustbe 3 first letters
            <table className="w-full"> 
                <thead className="border-b border-gray-200">
                    <tr>
                        <th className="text-left">ID</th>
                        <th className="text-left">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {countries.map((country) => (
                        <tr key={country._id} >
                            <td className="text-left">{country._id.slice(0, 3)}</td>
                            <td className="text-left">{country.name}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </>
  )
}

/*export function RegionsList() {
  const [formData, setFormData] = useState({
    name: "",
    countryId: ""
  });
  const [countries, setCountries] = useState<Country[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingSelect, setIsLoadingSelect] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFormValid(e.target.value.length > 0);
    setFormData({...formData, [e.target.name]: e.target.value});
  };    
  const handleSelectChange = (value: string) => {
    setFormData({...formData, countryId: value});
  };
  useEffect(() => {
    const fetchCountries = async () => {
        try{
            setIsLoadingSelect(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/countries`,
            {
                method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
      );
      const data = await response.json();
      setCountries(data);
        } catch (error) {
            console.error("Error fetching countries:", error);
        } finally {
            setIsLoadingSelect(false);
        }
    };
    const fetchRegions = async () => {
        try{    
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/regions`,
            {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
      );
      const data = await response.json();
      setRegions(data);
        } catch (error) {
            console.error("Error fetching regions:", error);
        } finally {
            setIsLoadingData(false);
        }
    };
    fetchCountries();
    fetchRegions();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/regions`, {
            method: "POST",
            body: JSON.stringify({ name: formData.name, country_id: formData.countryId}),
        });
        const data = await response.json();
        if(data.status!==201){
          throw new Error(data.error);
        }

        setRegions([...regions, data.data]);
    } catch (error) {
        console.error("Error creating country:", error);
    } finally {
        setFormData({name: "", countryId: ""});
        setIsLoading(false);
    }
};
   
  return (
    <>
     <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Crear Región</CardTitle>
          <CardDescription>Agregar una nueva región al sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="region-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la Región</Label>
              <Input
                id="name"
                name="name"
                placeholder="ej: Ancash"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 w-full">
              <Label htmlFor="countryId">Países</Label>
                <Select value={formData.countryId} onValueChange={handleSelectChange} disabled={isLoadingSelect}>
                <SelectTrigger id="countryId">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingSelect ? (
                    <SelectItem value="loading" disabled>
                      Cargando países...
                    </SelectItem>
                  ) : (
                    countries.map((country) => (
                      <SelectItem key={country._id} value={country._id}>
                        {country.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
             
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" form="region-form" disabled={!isFormValid || isLoading} className="w-full">
            {isLoading ? "Creando..." : "Crear región"}
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Regiones</CardTitle>
          <CardDescription>Lista de todas las regiones en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingData ? (
            <div className="flex justify-center py-8">
              <p>Cargando regiones...</p>
            </div>
          ) : (
            //create a table with country ID and name, id mustbe 3 first letters
            <table className="w-full"> 
                <thead className="border-b border-gray-200">
                    <tr>
                        <th className="text-left">ID</th>
                        <th className="text-left">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        regions.length === 0 ? (
                            <tr>
                                <td colSpan={2} className="text-center">No hay regiones</td>
                            </tr>
                        ) : 
                        (
                            regions.map((region) => (
                        <tr key={region._id} >
                            <td className="text-left">{region._id.slice(0, 3)}</td>
                            <td className="text-left">{region.name}</td>
                        </tr>
                    ))
                        )
                    }

                </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export function ProvincesList() {
  return <div>ProvincesList</div>
}

export function DistrictsList() {
  return <div>DistrictsList</div>
} 

export function LocalitiesList() {
  return <div>LocalitiesList</div>
} 
*/