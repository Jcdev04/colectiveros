export const fetchByParentId = async (id:string, endPoint: string)=>{
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/${endPoint}/${id}`,{
            method: "GET",
        })
        const data = await response.json();
        return data;
    }catch(error){
        console.log("the error:",error)
        return []
    }
}
export const fetchAll = async (endPoint: string)=>{
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/${endPoint}`,{
            method: "GET",
        })
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error)
        return []
    }
}