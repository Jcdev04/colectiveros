"use client";
import React, { useEffect, useState } from "react";
import { SelectOptions } from "../stops/select-options";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Places {
  _id: string;
  name: string;
}

const SelectType = ({
  initialLoad,
  nextPath,
  type,
}: {
  initialLoad: () => Promise<Places[]>;
  nextPath: string;
  type: string;
}) => {
  const pathName = usePathname();
  const [options, setOptions] = useState<Places[]>([]);
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    const fetchOptions = async () => {
      const optionsFromFetching = await initialLoad();
      setOptions(optionsFromFetching);
    };
    fetchOptions();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">{`${type}`}</h1>
      <p className="text-gray-500">
        Elige entre las opciones disponibles para continuar con el proceso
      </p>
      <SelectOptions
        name=""
        options={options}
        value={value}
        setValue={setValue}
      />
      <Link href={`${pathName}/${value}/${nextPath}`}>
        <Button
          variant="outline"
          className="text-gray-700 hover:bg-gray-100 mt-4"
        >
          Siguiente
        </Button>
      </Link>
    </div>
  );
};

export default SelectType;
