//use createLocation to create a region
import { createLocation } from "@/lib/createLocation";
import { RegionSchema } from "@/db/region.schema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  return createLocation("regions", RegionSchema, body);
}
