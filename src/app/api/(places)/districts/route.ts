//use createLocation to create a district
import { createLocation } from "@/lib/createLocation";
import { DistrictSchema } from "@/db/district.schema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  return createLocation("districts", DistrictSchema, body);
}

