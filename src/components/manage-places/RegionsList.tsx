import { Country } from "@/db/country.schema";
import { AbstractLocationList } from "./AbstractLocationList";

interface Region {
  _id: string;
  name: string;
}
export function RegionsList() {
  return (
    <AbstractLocationList<Region, Country>
      title="Región"
      description="Agregar una nueva región al sistema"
      parentTitle="Países"
      parentEndpoint="countries"
      endpoint="regions"
      parentPlaceholder="Seleccione un país"
      namePlaceholder="ej: Ancash"
      parentKey="country_id"
    />      
  );
} 