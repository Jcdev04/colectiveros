//use createLocation to create a locality
import { createLocation } from "@/lib/createLocation";
import { LocalitySchema } from "@/db/locality.schema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  return createLocation("localities", LocalitySchema, body);
}   
