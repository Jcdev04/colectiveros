"use client";
import {
  SelectOptions,
  SelectOptionsByParent,
} from "@/components/stops/select-options";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchByParentId } from "@/lib/fetchingBy";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { PencilIcon } from "@heroicons/react/16/solid";

import { useEffect, useState } from "react";
import { Stop, Schedule } from "@/db/stop.schema";
import { useCompany } from "@/context/CompanyContext";
import { set } from "zod";

interface Place {
  _id: string;
  name: string;
}
type TimeChangeHandler = (key: "hours" | "minutes", value: string) => void;

type SelectTimeGroupProps = {
  onChange: TimeChangeHandler;
  hours: string[];
  minutes: string[];
};

type SelectTimeTypeProps = {
  onChange: TimeChangeHandler;
  typeTime: "minutes" | "hours";
  options: string[];
};

export default function StopsPage() {
  const { company, loading: loadingCompany } = useCompany();
  const [loading, setLoading] = useState(false);
  const [stops, setStops] = useState<Stop[]>([]);
  const [regions, setRegions] = useState<Place[]>([]);
  const [region, setRegion] = useState<string>("");

  const [provinces, setProvinces] = useState<Place[]>([]);
  const [province, setProvince] = useState<string>("");

  const [districts, setDistricts] = useState<Place[]>([]);
  const [district, setDistrict] = useState<string>("");

  const [localities, setLocalities] = useState<Place[]>([]);
  const [locality, setLocality] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const [schedule, setSchedule] = useState<Schedule[]>([]);

  const [formData, setFormData] = useState({
    address: "",
    reference: "",
    coordinates: {
      lat: 0,
      lng: 0,
    },
    google_maps_url: "",
    phone: "",
  });

  // 1) Hook lives at top-level, always called
  useEffect(() => {
    // 2) Bail out until we have a company
    if (loadingCompany || !company) return;

    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        console.log("Fetching regions and stops...");
        const [dataRegions, dataStops] = await Promise.all([
          fetchByParentId("73326592-b8f4-403a-8a93-a9ca18d06894", "regions"),
          fetchByParentId(company._id, "stops"),
        ]);
        if (!cancelled) {
          setRegions(dataRegions);
          console.log(dataStops);
          setStops(dataStops);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [loadingCompany, company]);

  // 1) Si el contexto aún está cargando, muestra loader
  if (loadingCompany) return <div>Loading company…</div>;
  // 2) Si ya cargó pero no hay company, mensaje de error
  if (!company) return <div>No tienes empresa asociada.</div>;

  if (loading) return <div>Loading stops & regions…</div>;

  const onLoadSchedule = (schedule: Schedule[]) => {
    setSchedule(schedule);
  };

  const handleCheckedChange = (day: Schedule["day"]) => {
    setSchedule((prevSchedule) =>
      prevSchedule.map((item) =>
        item.day === day ? { ...item, is_available: !item.is_available } : item
      )
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const localityName = getNameByIdInState(locality, localities);
      const nameStop = `${company.name} - ${localityName}`;
      const body = {
        phone: formData.phone,
        name: nameStop,
        location: {
          address: formData.address,
          reference: formData.reference,
          google_maps_url: formData.google_maps_url,
          coordinates: formData.coordinates,
          country: {
            id: "73326592-b8f4-403a-8a93-a9ca18d06894",
            name: "Perú",
          },
          region: {
            id: region,
            name: getNameByIdInState(region, regions),
          },
          province: {
            id: province,
            name: getNameByIdInState(province, provinces),
          },
          district: {
            id: district,
            name: getNameByIdInState(district, districts),
          },
          locality: {
            id: locality,
            name: localityName,
          },
        },
        company: {
          id: company._id,
          name: company.name,
        },
        schedule,
      };
      console.log("body", body);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/stops`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...body }),
        }
      );
      const data = await response.json();
      if (data.status !== 201) throw new Error(data.error);
      setStops((prev) => [...prev, data.data]);
      setFormData({
        ...formData,
        address: "",
        reference: "",
        google_maps_url: "",
        phone: "",
      });
      setSchedule([]);
    } catch (error) {
      console.error("Error creating station:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getNameByIdInState = (id: string, state: Place[]) => {
    return state.find((element) => element._id == id)?.name;
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">Administrar Paraderos</h1>
        <p className="text-muted-foreground">Crea y administra paraderos</p>
      </div>
      <div className="mt-4 space-y-3">
        <Card>
          <CardHeader>
            <CardTitle>Añade paraderos</CardTitle>
            <CardDescription>Llena todos los campos</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectOptions
                  name="Región"
                  options={regions}
                  value={region}
                  setValue={setRegion}
                />
                <SelectOptionsByParent
                  name="Provincia"
                  options={provinces}
                  setOptions={setProvinces}
                  value={province}
                  setValue={setProvince}
                  parentValue={region}
                  endpoint={"provinces"}
                />
                <SelectOptionsByParent
                  name="Distrito"
                  options={districts}
                  setOptions={setDistricts}
                  value={district}
                  setValue={setDistrict}
                  parentValue={province}
                  endpoint={"districts"}
                />
                <SelectOptionsByParent
                  name="Localidad"
                  options={localities}
                  setOptions={setLocalities}
                  value={locality}
                  setValue={setLocality}
                  parentValue={district}
                  endpoint={"localities"}
                />
              </div>
              {locality && (
                <div className="space-y-2">
                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reference">Referencia</Label>
                    <Input
                      id="reference"
                      name="reference"
                      value={formData.reference}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="google_maps_url">URL de Google Maps</Label>
                    <Input
                      id="google_maps_url"
                      name="google_maps_url"
                      type="url"
                      value={formData.google_maps_url}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Número de celular</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mt-5 space-y-2">
                    {schedule.length === 0 ? (
                      <div>
                        <Label>Crear un horario</Label>
                        <DialogSchedule onLoadSchedule={onLoadSchedule} />
                      </div>
                    ) : (
                      <div>
                        <Label>Horarios guardados</Label>
                        {schedule.map((item) => (
                          <div
                            key={item.day}
                            className="grid grid-cols-3 items-center  p-2"
                          >
                            <div>{item.day}</div>
                            <div className="flex items-center gap-2">
                              {item.is_available ? (
                                <>
                                  <p className="">
                                    {item.hours?.from} - {item.hours?.to}
                                  </p>
                                  <div>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="icon"
                                    >
                                      <PencilIcon />
                                    </Button>
                                  </div>
                                </>
                              ) : (
                                "No habilitado"
                              )}
                            </div>
                            <div>
                              <Switch
                                checked={item.is_available}
                                onCheckedChange={() =>
                                  handleCheckedChange(item.day)
                                }
                              />
                            </div>
                          </div>
                        ))}
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? "Creando..." : "Crear Paradero"}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            {stops.length === 0 ? (
              <div>No hay stops</div>
            ) : (
              <div>
                {stops.map((stop) => {
                  return (
                    <div
                      key={stop._id}
                      className="grid grid-cols-3 items-center  p-2"
                    >
                      <div>{stop.name}</div>
                      <div className="flex items-center gap-2">
                        <p className="">
                          {stop.location?.address} - {stop.location?.reference}
                        </p>
                      </div>
                      <div>
                        <Button type="button" variant="outline" size="icon">
                          <PencilIcon />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const days = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
] as const;

function DialogSchedule({
  onLoadSchedule,
}: Readonly<{
  onLoadSchedule: (schedule: Schedule[]) => void;
}>) {
  const [hours, setHours] = useState<string[]>([]);
  const [minutes, setMinutes] = useState<string[]>([]);
  const [indexDays, setIndexDays] = useState<string[]>([]);

  const [timeFrom, setTimeFrom] = useState({
    hours: "00",
    minutes: "00",
  });
  const [timeTo, setTimeTo] = useState({
    hours: "00",
    minutes: "00",
  });

  useEffect(() => {
    const getTime = () => {
      const hours = [];
      const minutes = [];
      for (let index = 0; index <= 24; index++) {
        hours.push(`${index < 10 ? "0" + index : index.toString()}`);
      }
      for (let index = 0; index <= 45; index += 15) {
        minutes.push(`${index < 10 ? "0" + index : index.toString()}`);
      }
      return { hours, minutes };
    };
    setHours(getTime().hours);
    setMinutes(getTime().minutes);
  }, []);

  const onFromChange = (key: string, value: string) => {
    setTimeFrom((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const onToChange = (key: string, value: string) => {
    setTimeTo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSubmit = () => {
    if (
      !timeFrom.hours &&
      !timeFrom.minutes &&
      !timeTo.hours &&
      !timeTo.minutes
    ) {
      alert("todos los campos deben estar llenos");
      return;
    }
    const timeFromStr = `${timeFrom.hours}:${timeFrom.minutes}`;
    const timeToStr = `${timeTo.hours}:${timeTo.minutes}`;

    if (timeFromStr > timeToStr) {
      alert("El tiempo de inicio debe ser menor que el tiempo de finalización");
      return;
    }
    if (indexDays.length === 0) alert("Debe seleccionar al menos un día");

    const schedule = createScheduleArr(timeFromStr, timeToStr);
    onLoadSchedule(schedule);
  };

  const createScheduleArr = (from: string, to: string): Schedule[] => {
    const schedule = days.map((item, index) => {
      const is_available = indexDays.includes(index.toString());
      return {
        day: item,
        hours: {
          from,
          to,
        },
        is_available,
      };
    });
    return schedule;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Crear el horario</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div>
          <DialogHeader>
            <DialogTitle>Editar horario</DialogTitle>
            <DialogDescription>
              Selecciona los días y crea un horario general
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Horario Inicio</Label>
              <SelectTimeGroup
                onChange={onFromChange}
                hours={hours}
                minutes={minutes}
              />
            </div>
            <div className="space-y-2">
              <Label>Horario Fin</Label>
              <SelectTimeGroup
                onChange={onToChange}
                hours={hours}
                minutes={minutes}
              />
            </div>
            <div className="space-y-2">
              <Label>Elige los días de atención</Label>
              <ToggleGroup
                value={indexDays}
                onValueChange={(indexes) => setIndexDays(indexes)}
                type="multiple"
                className="grid grid-cols-4 gap-3"
                variant={"outline"}
              >
                {days.map((day, index) => (
                  <ToggleGroupItem
                    key={day}
                    value={index.toString()}
                    className="rounded-xl w-[80px]"
                    aria-label={day}
                  >
                    {day}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={onSubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * SelectTimeGroup which is for "From" or "To"
 * @param TimeChangeHandler, string[], string[]
 * @returns Component
 */
const SelectTimeGroup = ({
  onChange,
  hours,
  minutes,
}: SelectTimeGroupProps) => {
  return (
    <div className="flex items-center gap-2">
      <SelectTimeType onChange={onChange} typeTime={"hours"} options={hours} />
      <p>:</p>
      <SelectTimeType
        onChange={onChange}
        typeTime={"minutes"}
        options={minutes}
      />
    </div>
  );
};
/**
 * SelectTimeType, individual component for minutes or hours
 * @param TimeChangeHandler, string, string[]
 * @returns Component
 */
const SelectTimeType = ({
  onChange,
  typeTime,
  options,
}: SelectTimeTypeProps) => {
  return (
    <Select
      defaultValue="00"
      onValueChange={(value) => onChange(typeTime, value)}
    >
      <SelectTrigger className="w-[70px]">
        <SelectValue placeholder="00" />
      </SelectTrigger>
      <SelectContent>
        {options.map((Item) => (
          <SelectItem key={Item} value={Item}>
            {Item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
