
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CountriesList} from "@/components/places";
import { RegionsList } from "@/components/manage-places/RegionsList";
import { ProvincesList } from "@/components/manage-places/ProvincesList";
import { DistrictsList } from "@/components/manage-places/DistrictsList";
import { LocalitiesList } from "@/components/manage-places/LocalitiesList";
export default function LugaresPage() {
  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold">Administrar Lugares</h1>
        <p className="text-muted-foreground">Crea y administra lugares en el sistema</p>
      </div>
      <div className="mt-4">
        <Tabs defaultValue="localities">
          <TabsList className="w-full">
            <TabsTrigger value="countries">Paises</TabsTrigger>
            <TabsTrigger value="regions">Regiones</TabsTrigger>
            <TabsTrigger value="provinces">Provincias</TabsTrigger>
            <TabsTrigger value="districts">Distritos</TabsTrigger>
            <TabsTrigger value="localities">Localidades</TabsTrigger>
          </TabsList>
          <TabsContent value="countries">
            <CountriesList />
          </TabsContent>
          <TabsContent value="regions">
            <RegionsList />
          </TabsContent>
          <TabsContent value="provinces">
            <ProvincesList />
          </TabsContent>
          <TabsContent value="districts">
            <DistrictsList />
          </TabsContent>
          <TabsContent value="localities">
            <LocalitiesList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

