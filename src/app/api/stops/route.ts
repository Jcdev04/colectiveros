import { NextRequest, NextResponse } from "next/server";
import { dbColectivero } from "@/lib/firebase"; // Asegúrate que este exporta tu instancia Firestore
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { StopSchema } from "@/db/stop.schema"; // ajusta el path si lo tienes en otro lugar
import { randomUUID } from "crypto";

const validatestop = StopSchema.omit({ _id: true });

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
    await setDoc(stopDoc, { ...stop, _id: stopId });

    return NextResponse.json({
      message: "stop created successfully",
      status: 201,
      data: {
        _id: stopId,
        ...stop,
      },
    });
  } catch (err: any) {
    console.error("[STOP_POST_ERROR]", err);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const localityId = searchParams.get("localityId");
    if (!localityId) {
      return NextResponse.json(
        { error: "localityId is required" },
        { status: 400 }
      );
    }
    // Consultar stops por locality_id
    const stopsRef = collection(dbColectivero, "stops");
    const stopsQ = query(
      stopsRef,
      where("location.locality.id", "==", localityId)
    );
    const stopsSnap = await getDocs(stopsQ);

    // 4️⃣ Para cada stop, traer rutas y nombre de destino
    const stops = await Promise.all(
      stopsSnap.docs.map(async (stopDoc) => {
        const stopData = { _id: stopDoc.id, ...(stopDoc.data() as any) };

        // Rutas salientes
        const routesRef = collection(dbColectivero, "routes");
        const routesQ = query(
          routesRef,
          where("origin_id", "==", stopDoc.id),
          limit(1)
        );
        const routeSnap = await getDocs(routesQ);

        let route = null;
        if (!routeSnap.empty) {
          const routeDoc = routeSnap.docs[0];
          const r = routeDoc.data() as any;

          // Lookup del nombre de destino
          const destDoc = await getDoc(
            doc(dbColectivero, "stops", r.destination_id)
          );
          const destination =
            destDoc.exists() && destDoc.data() ? (destDoc.data() as any) : null;

          route = {
            _id: routeDoc.id,
            origin_id: r.origin_id,
            destination_id: r.destination_id,
            destination_name: destination.name,
            destination_locality: destination.location.locality.name,
            destion_locality: r.destionation,
            duration_minutes: r.duration_minutes,
            fare_pen: r.fare_pen,
            schedule: r.schedule,
          };
        }
        return { ...stopData, route };
      })
    );

    return NextResponse.json({
      message: "stop fetched successfully",
      status: 200,
      data: stops,
    });
  } catch (err: any) {
    console.error("[STOP_GET_ERROR]", err);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
