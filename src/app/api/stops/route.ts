import { NextRequest, NextResponse } from "next/server";
import { dbColectivero } from "@/lib/firebase"; // Asegúrate que este exporta tu instancia Firestore
import { collection, doc, setDoc } from "firebase/firestore";
import { StopSchema } from "@/db/stop.schema"; // ajusta el path si lo tienes en otro lugar
import { randomUUID } from "crypto";

const validatestop = StopSchema.omit({ _id: true, google_maps_url: true });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // ✅ Validación con Zod
    const result = validatestop.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid stop data", details: result.error.format() },
        { status: 400 }
      );
    }
    const stop = result.data;
    const stopId = randomUUID();
    // Guarda usando el _id como documento
    const stopsRef = collection(dbColectivero, "stops");
    const stopDoc = doc(stopsRef, stopId);
    await setDoc(stopDoc, {...stop, _id: stopId});
    
    return NextResponse.json({ message: "stop created successfully", status: 201, data:{
      _id: stopId,
      ...stop
    } });

  } catch (err: any) {
    console.error("[STOP_POST_ERROR]", err);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
