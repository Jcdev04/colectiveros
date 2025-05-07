import { AbstractLocationList } from "./AbstractLocationList";

interface Province {
  _id: string;
  name: string;
  region_id: string;
}

interface Region {
  _id: string;
  name: string;
}

export function ProvincesList() {
  return (
    <AbstractLocationList<Province, Region>
      title="Provincia"
      description="Agregar una nueva provincia al sistema"
      parentTitle="Regiones"
      parentEndpoint="regions"
      endpoint="provinces"
      parentPlaceholder="Seleccione una región"
      namePlaceholder="ej: Huaraz"
      parentKey="region_id"
    />
  );
} 