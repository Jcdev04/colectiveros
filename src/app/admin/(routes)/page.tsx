"use client";

import { SelectOptions, SelectOptionsByParent } from "@/components/stops/select-options";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchAll } from "@/lib/fetchingBy";
import { useEffect, useState } from "react";
import { Schedule, ScheduleSchema } from "@/db/route.schema";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { PencilIcon } from "@heroicons/react/16/solid";

/**
 * Types into component
 */
interface Item {
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

export default function RoutesPage(){
  const [companies, setCompanies] = useState<Item[]>([]);
  const [company, setCompany] = useState<string>("")

  const [paraderosPuntoA, setParaderosPuntoA] = useState<Item[]>([])
  const [paraderoPuntoA, setParaderoPuntoA] = useState<string>("");

  const [paraderosPuntoB, setParaderosPuntoB] = useState<Item[]>([])
  const [paraderoPuntoB, setParaderoPuntoB] = useState<string>("");

  const [duration, setDuration] = useState<string>("0");
  const [farePen, setFarePen ] = useState<string>("0")
  
  const [schedule, setSchedule] = useState<Schedule[]>([
  ])

  const onLoadSchedule =  (schedule: Schedule[])=>{
    setSchedule(schedule)
  }

  const handleCheckedChange = (day: Schedule["day"]) => {
  setSchedule((prevSchedule) =>
    prevSchedule.map((item) =>
      item.day === day
        ? { ...item, is_available: !item.is_available }
        : item
    )
  );
};

  useEffect(()=>{
    const initialLoad = async ()=>{
      try{
        const data = await fetchAll("companies");
        setCompanies(data);
      }catch(error){
        console.log(error)
      }
    }
    initialLoad()
  },[])

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    //Falta validar
    const body = {
      company_id: company,
      origin_id: paraderoPuntoA,
      destination_id: paraderoPuntoB,
      duration_minutes: parseInt(duration),
      fare_pen: parseFloat(farePen),
      schedule
    }
    console.log(body)
    
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/routes`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...body}),
      })
      const data = await response.json();
      console.log(data)
      setCompany("");
      setParaderoPuntoA("")
      setParaderoPuntoB("")
      setDuration("")
      setFarePen("")
      setSchedule([])
    }catch(e){
      console.log(e)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold">Administrar Rutas</h1>
        <p className="text-muted-foreground">Crea y administra rutas</p>
      </div>
      <div className="mt-4 space-y-3">
        <Card>
          <CardHeader>
            <CardTitle>Añade paraderos</CardTitle>
            <CardDescription>Llena todos los campos</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit}>
              <SelectOptions name="Empresas de Transporte" options={companies} value={company} setValue={setCompany}/>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectOptionsByParent name="Punto de inicio" options={paraderosPuntoA} setOptions={setParaderosPuntoA} endpoint="stops" parentValue={company} setValue={setParaderoPuntoA} value={paraderoPuntoA} />
                <SelectOptionsByParent name="Punto de fin" options={paraderosPuntoB} setOptions={setParaderosPuntoB} endpoint="stops" parentValue={company} setValue={setParaderoPuntoB} value={paraderoPuntoB} />
                <div className="space-y-2">
                  <Label htmlFor="duration_minutes">Duración (en minutos)</Label>
                  <Input id="duration_minutes" type="number" value={duration} onChange={(e)=>setDuration(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fare_pen">Precio del pasaje (S/.)</Label>
                  <Input id="fare_pen" type="number" value={farePen} onChange={(e)=>setFarePen(e.target.value)} />
                </div>
              </div>
              <div className="mt-5 space-y-2">
                {schedule.length===0?
                  (
                    <div>
                      <Label>Crear un horario</Label>
                      <DialogSchedule onLoadSchedule={onLoadSchedule}/>
                    </div>
                  )
                :
                  (<div>
                      <Label>Horarios guardados</Label>
                      {schedule.map((item) => (
                        <div key={item.day} className="grid grid-cols-3 items-center  p-2">
                          <div>{item.day}</div>
                          <div className="flex items-center gap-2">
                            {item.is_available ?(
                              <>
                                <p className="">{item.hours?.from} - {item.hours?.to}
                                </p>
                                <div>
                                  <Button type="button" variant="outline" size="icon">
                                    <PencilIcon/>
                                  </Button>
                                </div>  
                              </>
                            )
                             : "No habilitado"}
                            
                          </div>
                          <div>
                            <Switch checked={item.is_available} onCheckedChange={() => handleCheckedChange(item.day)}/>
                          </div>
                        </div>
                      ))}
                    <Button type="submit">Crear ruta</Button>

                    </div>
                    )
                }
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
const days = ["Domingo","Lunes", "Martes","Miércoles", "Jueves","Viernes","Sábado"] as const;

function DialogSchedule ({onLoadSchedule}:{onLoadSchedule:(schedule:Schedule[])=>void}){
  const [hours, setHours] = useState<string[]>([])
  const [minutes, setMinutes] = useState<string[]>([])
  const [indexDays, setIndexDays] = useState<string[]>([])

  const [timeFrom, setTimeFrom] = useState({
    hours: "00",
    minutes: "00" 
  })
  const [timeTo, setTimeTo] = useState({
    hours: "00",
    minutes: "00" 
  })
  
  useEffect(()=>{
    const getTime = ()=>{
      const hours = []
      const minutes = []
      for (let index = 0; index <= 24; index++) {
        hours.push(`${index<10? "0"+index: index.toString()}`)
      }
      for (let index = 0; index <= 45; index+=15) {
        minutes.push(`${index<10? "0"+index: index.toString()}`)
      }
      return {hours, minutes}
    }
    setHours(getTime().hours)
    setMinutes(getTime().minutes)
  },[])

  const onFromChange = (key:string, value:string)=>{
    setTimeFrom((prev) => ({
    ...prev,
    [key]: value
  }));
  }
  const onToChange = (key:string, value:string)=>{
    setTimeTo((prev) => ({
    ...prev,
    [key]: value
  }));
  }

  const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(!timeFrom.hours && !timeFrom.minutes && !timeTo.hours && !timeTo.minutes){
      alert("todos los campos deben estar llenos")
      return; 
    }
    const timeFromStr = `${timeFrom.hours}:${timeFrom.minutes}`
    const timeToStr = `${timeTo.hours}:${timeTo.minutes}`

    if(timeFromStr>timeToStr) {
      alert("El tiempo de inicio debe ser menor que el tiempo de finalización")
      return;
    }
    if(indexDays.length === 0) alert("Debe seleccionar al menos un día");

    const schedule = createScheduleArr(timeFromStr, timeToStr);
    onLoadSchedule(schedule)
  }


  const createScheduleArr = (from:string, to:string):Schedule[]=>{
    const schedule =  days.map((item, index)=>{
      const is_available = indexDays.includes(index.toString())
      return {
        day: item,
        hours: {
          from,
          to
        },
        is_available
      }
    })
    return schedule
  }

  return(
     <Dialog>
      <DialogTrigger asChild >
        <Button variant="outline">Crear el horario</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
        <DialogHeader>
          <DialogTitle>Editar horario</DialogTitle>
          <DialogDescription>
            Selecciona los días y crea un horario general
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Horario Inicio</Label>
            <SelectTimeGroup onChange={onFromChange} hours={hours} minutes={minutes}/>
          </div>
          <div className="space-y-2">
            <Label>Horario Fin</Label>
            <SelectTimeGroup onChange={onToChange} hours={hours} minutes={minutes}/>
          </div>
          <div className="space-y-2">
            <Label>Elige los días de atención</Label>
            <ToggleGroup value={indexDays} onValueChange={(indexes)=>setIndexDays(indexes)} type="multiple" className="grid grid-cols-4 gap-3" variant={"outline"}>
              {
                days.map((day, index)=>(
                  <ToggleGroupItem key={day} value={index.toString()} className="rounded-xl w-[80px]" aria-label={day}>
                    {day}
                  </ToggleGroupItem>
                ))
              }
            </ToggleGroup>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

/**
 * SelectTimeGroup which is for "From" or "To"
 * @param TimeChangeHandler, string[], string[] 
 * @returns Component
*/
const SelectTimeGroup = ({onChange,hours,minutes}:SelectTimeGroupProps)=>{
  return (
      <div className="flex items-center gap-2">
          <SelectTimeType onChange={onChange} typeTime={"hours"} options={hours}/>
          <p>:</p>
          <SelectTimeType onChange={onChange} typeTime={"minutes"} options={minutes}/>
        </div>
    )
}
/**
 * SelectTimeType, individual component for minutes or hours
 * @param TimeChangeHandler, string, string[] 
 * @returns Component
*/
const SelectTimeType = ({onChange, typeTime, options}:SelectTimeTypeProps)=>{
  return(
      <Select defaultValue="00" onValueChange={(value)=>onChange(typeTime,value)}>
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder="00"/>
        </SelectTrigger>
        <SelectContent >
          {
            options.map((Item)=>(
              <SelectItem key={Item} value={Item}>
                {Item}
              </SelectItem>
            )
            )
          }
        </SelectContent>
      </Select>
)
}