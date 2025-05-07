import { AbstractLocationList } from "./AbstractLocationList";

interface District {
  _id: string;
  name: string;
  province_id: string;
}

interface Province {
  _id: string;
  name: string;
}

export function DistrictsList() {
  return (
    <AbstractLocationList<District, Province>
      title="Distrito"
      description="Agregar un nuevo distrito al sistema"
      parentTitle="Provincias"
      parentEndpoint="provinces"
      endpoint="districts"
      parentPlaceholder="Seleccione una provincia"
      namePlaceholder="ej: Independencia"
      parentKey="province_id"
    />
  );
} 