import { NextRequest, NextResponse } from "next/server";
import { dbColectivero } from "@/lib/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { RouteSchema } from "@/db/route.schema"; // Ajusta path si es necesario
import { randomUUID } from "crypto";

const validateRoute = RouteSchema.omit({ _id: true});


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
// ✅ Validación con Zod
    const result = validateRoute.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid route data", details: result.error.format() },
        { status: 400 }
      );
    }

    const route = result.data;
    const routeId = randomUUID();

    const ref = doc(collection(dbColectivero, "routes"), routeId);
    await setDoc(ref, {...route, _id: routeId});

    return NextResponse.json(
      { message: "Route created successfully" },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("[ROUTE_POST_ERROR]", err);
    return NextResponse.json(
      {
        error: "Failed to create route",
        details: err.message,
      },
      { status: 500 }
    );
  }
}
