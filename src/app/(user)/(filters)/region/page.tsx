"use client";
import SelectType from "@/components/user/select-type";
import { fetchAll } from "@/lib/fetchingBy";

interface Places {
  _id: string;
  name: string;
}
const Regiones = () => {
  const initialLoad = async (): Promise<Places[]> => {
    const response = await fetchAll("regions");
    const data: Places[] = response.map((item: Places) => ({
      _id: item._id,
      name: item.name,
    }));
    return data;
  };
  return (
    <div className="space-y-2">
      <SelectType type="Región" nextPath="province" initialLoad={initialLoad} />
    </div>
  );
};

export default Regiones;
