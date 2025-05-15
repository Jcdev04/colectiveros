"use client";
import SelectType from "@/components/user/select-type";
import { fetchByParentId } from "@/lib/fetchingBy";
import { useParams } from "next/navigation";

interface Places {
  _id: string;
  name: string;
}

const Provincias = () => {
  //take regionId param from Url
  const { regionId } = useParams();
  const initialLoad = async (): Promise<Places[]> => {
    const response = await fetchByParentId(regionId as string, "provinces");
    const data: Places[] = response.map((item: Places) => ({
      _id: item._id,
      name: item.name,
    }));
    return data;
  };
  return (
    <div className="space-y-2">
      <SelectType
        type="Provincias"
        nextPath="district"
        initialLoad={initialLoad}
      />
    </div>
  );
};

export default Provincias;
