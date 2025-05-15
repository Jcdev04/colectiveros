"use client";
import SelectType from "@/components/user/select-type";
import { fetchByParentId } from "@/lib/fetchingBy";
import { useParams } from "next/navigation";

interface Places {
  _id: string;
  name: string;
}

const Localidades = () => {
  //take regionId param from Url
  const { provinceId } = useParams();
  const initialLoad = async (): Promise<Places[]> => {
    const response = await fetchByParentId(provinceId as string, "districts");
    const data: Places[] = response.map((item: Places) => ({
      _id: item._id,
      name: item.name,
    }));
    return data;
  };
  return (
    <div className="space-y-2">
      <SelectType
        type="Distritos"
        nextPath="locality"
        initialLoad={initialLoad}
      />
    </div>
  );
};

export default Localidades;
