//use createLocation to create a region
import { createLocation } from "@/lib/createDocument";
import { RegionSchema } from "@/db/region.schema";
import { NextRequest } from "next/server";
import { getAllDocuments } from "@/lib/getAllDocuments";


export async function POST(req: NextRequest) {
  const body = await req.json();
  return createLocation("regions", RegionSchema, body);
}

export async function GET() {
  return getAllDocuments("regions");
}
