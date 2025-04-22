import { NextRequest, NextResponse } from "next/server";
import { dbColectivero } from "@/lib/firebase"; // Asegúrate que este exporta tu instancia Firestore
import { collection, doc, setDoc } from "firebase/firestore";
import { StationSchema } from "@/db/station.schema"; // ajusta el path si lo tienes en otro lugar
import { randomUUID } from "crypto";

const validateStation = StationSchema.omit({ _id: true });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // ✅ Validación con Zod
    const result = validateStation.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid station data", details: result.error.format() },
        { status: 400 }
      );
    }

    const station = result.data;
    const stationId = randomUUID();
    // Guarda usando el _id como documento
    const stationsRef = collection(dbColectivero, "stations");
    const stationDoc = doc(stationsRef, stationId);
    await setDoc(stationDoc, station);
    
    return NextResponse.json({ message: "Station created successfully" }, { status: 201 });

  } catch (err: any) {
    console.error("[STATION_POST_ERROR]", err);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
