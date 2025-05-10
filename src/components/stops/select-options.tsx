"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../ui/label";
import { useEffect } from "react";
import { fetchByParentId } from "@/lib/fetchingBy";
interface Place {
  _id: string;
  name: string;
}

export const SelectOptions = ({name, options, value, setValue}:{name:string, options: Place[], value: string, setValue: React.Dispatch<React.SetStateAction<string>> }) =>{
    return (
        <div className="space-y-2">
            <Label>{name}</Label>
            <Select value={value} onValueChange={(item)=>{setValue(item)}}>
                <SelectTrigger >
                    <SelectValue placeholder={`Selecciona nombre de ${name}`}/>
                </SelectTrigger>
                <SelectContent>
                    { options.length !== 0 &&
                        options.map((item)=>(
                            <SelectItem key={item._id} value={item._id}>{item.name}</SelectItem>
                        ))
                    }
                </SelectContent>  
            </Select>
        </div>
  )
}
export const SelectOptionsByParent = ({name, options, setOptions, value, setValue, parentValue, endpoint}:{name:string, options: Place[], setOptions: React.Dispatch<React.SetStateAction<Place[]>>,value: string, setValue: React.Dispatch<React.SetStateAction<string>>, parentValue: string, endpoint: string}) =>{
    
    useEffect(()=>{
        const fetchData = async  () =>{
            const data = await fetchByParentId(parentValue, endpoint)
            setOptions(data)
        }
        if(parentValue){
            fetchData();
        }else{
            setOptions([])
        }
    },[parentValue])
    return (
        <div className="space-y-2">
            <Label>{name}</Label>
            <Select disabled={!parentValue}  value={value} onValueChange={(item)=>{setValue(item)}}>
                <SelectTrigger >
                    <SelectValue placeholder={`Selecciona nombre de ${name}`}/>
                </SelectTrigger>
                <SelectContent>
                    { options.length !== 0 && 
                        options.map((item)=>(
                            <SelectItem key={item._id} value={item._id}>{item.name}</SelectItem>
                        ))
                    }
                </SelectContent>  
            </Select>
        </div>
  )
}