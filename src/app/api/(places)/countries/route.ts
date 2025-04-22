import { createLocation } from "@/lib/createLocation";
import { CountrySchema } from "@/db/country.schema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  return createLocation("countries", CountrySchema, body);
}