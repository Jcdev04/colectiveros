"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bus, Building, Phone, ArrowRight } from "lucide-react";
import { useCompany } from "@/context/CompanyContext";
const OnBoarding = () => {
  const session = useSession();
  const { setCompany } = useCompany();
  const router = useRouter();

  const registerCompany = async (formData: FormData) => {
    console.log("session", session?.data?.user?.id);
    const payload = {
      name: formData.get("companyName"),
      phone: formData.get("phone"),
      user_id: session?.data?.user?.id,
      logo: "",
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/companies`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    return response.json();
  };

  const handleRegisterCompany = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await registerCompany(formData);
    // Handle result (e.g., show success/error, redirect, etc.)
    console.log("Company registration result:", result);
    if (result.status === 201) {
      setCompany(result.data);
      router.push("/colectivero/inicio");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bus className="h-6 w-6 text-indigo-600 mr-2" />
              <span className="font-bold text-xl text-indigo-900">
                Chapaturuta
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleRegisterCompany} className="max-w-md mx-auto">
          {/* Form Card */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Registra tu Empresa
              </h2>
              <p className="text-gray-600 mt-2">
                Completa la información básica de tu empresa de transporte
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="companyName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Nombre de la Empresa *
                  </Label>
                  <div className="relative">
                    <Input
                      id="companyName"
                      type="text"
                      name="companyName"
                      placeholder="Transportes San Martín S.A.C."
                      className="h-12 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 pl-10"
                    />
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Teléfono de contacto *
                  </Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="+51 999 888 777"
                      className="h-12 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 pl-10"
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="bg-indigo-50 p-4 rounded-xl">
                  <p className="text-sm text-indigo-800">
                    <strong>Nota:</strong> Esta información será visible para
                    los usuarios que busquen rutas de tu empresa.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                {/* <Button
                  variant="outline"
                  className="flex-1 h-12 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl"
                >
                  Cancelar
                </Button> */}
                <Button
                  type={"submit"}
                  className="flex-1 w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                >
                  Continuar
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default OnBoarding;
