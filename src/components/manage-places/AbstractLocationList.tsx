"use client"
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Location {
  _id: string;
  name: string;
  parentId?: string;
}

interface ParentLocation {
  _id: string;
  name: string;
}

interface AbstractLocationListProps<T extends Location, P extends ParentLocation> {
  title: string;
  description: string;
  parentTitle: string;
  parentEndpoint: string;
  endpoint: string;
  parentPlaceholder: string;
  namePlaceholder: string;
  parentKey: string;
}

export function AbstractLocationList<T extends Location, P extends ParentLocation>({
  title,
  description,
  parentTitle,
  parentEndpoint,
  endpoint,
  parentPlaceholder,
  namePlaceholder,
  parentKey
}: AbstractLocationListProps<T, P>) {
  const [formData, setFormData] = useState({
    name: "",
    [parentKey]: ""
  });
  const [parentLocations, setParentLocations] = useState<P[]>([]);
  const [locations, setLocations] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingSelect, setIsLoadingSelect] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFormValid(e.target.value.length > 0);
    setFormData({...formData, [e.target.name]: e.target.value});
  };    

  const handleSelectChange = (value: string) => {
    setFormData({...formData, [parentKey]: value});
  };

  useEffect(() => {
    const fetchParentLocations = async () => {
      try {
        setIsLoadingSelect(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/${parentEndpoint}`);
        const data = await response.json();
        setParentLocations(data);
      } catch (error) {
        console.error(`Error fetching ${parentTitle}:`, error);
      } finally {
        setIsLoadingSelect(false);
      }
    };

    const fetchLocations = async () => {
      try {
        setIsLoadingData(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/${endpoint}`);
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchParentLocations();
    fetchLocations();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          [parentKey]: formData[parentKey]
        }),
      });
      const data = await response.json();
      if (data.status !== 201) {
        throw new Error(data.error);
      }
      setLocations([...locations, data.data]);
    } catch (error) {
      console.error(`Error creating ${title}:`, error);
    } finally {
      setFormData({ name: "", [parentKey]: "" });
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">{`Crear ${title}`}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="location-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{`Nombre de ${title}`}</Label>
              <Input
                id="name"
                name="name"
                placeholder={namePlaceholder}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 w-full">
              <Label htmlFor={parentKey}>{parentTitle}</Label>
              <Select value={formData[parentKey]} onValueChange={handleSelectChange} disabled={isLoadingSelect}>
                <SelectTrigger id={parentKey}>
                  <SelectValue placeholder={parentPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingSelect ? (
                    <SelectItem value="loading" disabled>
                      Cargando...
                    </SelectItem>
                  ) : (
                    parentLocations.map((parent) => (
                      <SelectItem key={parent._id} value={parent._id}>
                        {parent.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" form="location-form" disabled={!isFormValid || isLoading} className="w-full">
            {isLoading ? "Creando..." : `Crear ${title}`}
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{`Lista de todas las ${title} en el sistema`}</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingData ? (
            <div className="flex justify-center py-8">
              <p>Cargando...</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left">ID</th>
                  <th className="text-left">Nombre</th>
                </tr>
              </thead>
              <tbody>
                {locations.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="text-center">No hay datos</td>
                  </tr>
                ) : (
                  locations.map((location) => (
                    <tr key={location._id}>
                      <td className="text-left">{location._id.slice(0, 3)}</td>
                      <td className="text-left">{location.name}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </>
  );
} 