"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Company } from "@/db/company.schema";
import { useEffect, useState } from "react";

export default function CompaniesPage() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        logo: ""
    }); 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /**
     * Send all messages
     * @param e -> Event onSubmit
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/companies`, {
                method: "POST",
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if(data.status !== 201){
                throw new Error("Error adding company");
            }
            console.log(data.data);
            setCompanies([...companies, data.data]);
        } catch (error) {
            console.error("Error fetching companies:", error);
        } finally {
            setIsLoading(false);
        }
    };
  // Get all companies and load this to teh interface
  useEffect(() => {
    const fetchCompanies = async () => {
        setIsLoading(true);
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/companies`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setCompanies(data);
        } catch (error) {
            console.error("Error fetching companies:", error);
        } finally {
            setIsLoading(false);
        }
    };
    fetchCompanies();
  }, []);
  return (<div className="container mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold">Administrar Empresas</h1>
        <p className="text-muted-foreground">
            Crea y administra empresas en el sistema
        </p>
        <Card>
            <CardHeader>
                <CardTitle>Crear Empresa</CardTitle>
                <CardDescription>
                    Crea una nueva empresa en el sistema
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <Label htmlFor="phone">Teléfono</Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            <Label htmlFor="logo">Logo</Label>
                            <Input
                                id="logo"
                                name="logo"
                                value={formData.logo}
                                onChange={handleChange}
                            />
                            <Button type="submit">Crear Empresa</Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
        <Card>
        <CardHeader>
          <CardTitle>Empresas</CardTitle>
          <CardDescription>{`Lista de todas las empresas en el sistema`}</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
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
                {companies.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="text-center">No hay datos</td>
                  </tr>
                ) : (
                  companies.map((companies) => (
                    <tr key={companies._id}>
                      <td className="text-left">{companies._id.slice(0, 3)}</td>
                      <td className="text-left">{companies.name}</td>
                      <td className="text-left">{companies.phone}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
