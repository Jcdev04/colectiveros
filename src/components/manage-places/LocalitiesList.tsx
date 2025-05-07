import { AbstractLocationList } from "./AbstractLocationList";

interface Locality {
  _id: string;
  name: string;
  district_id: string;
}

interface District {
  _id: string;
  name: string;
}

export function LocalitiesList() {
  return (
    <AbstractLocationList<Locality, District>
      title="Localidad"
      description="Agregar una nueva localidad al sistema"
      parentTitle="Distritos"
      parentEndpoint="districts"
      endpoint="localities"
      parentPlaceholder="Seleccione un distrito"
      namePlaceholder="ej: Pueblo Libre"
      parentKey="district_id"
    />
  );
} 