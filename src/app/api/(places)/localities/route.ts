//use createLocation to create a locality
import { createLocation } from "@/lib/createDocument";
import { LocalitySchema } from "@/db/locality.schema";
import { NextRequest } from "next/server";
import { getAllDocuments } from "@/lib/getAllDocuments";
export async function POST(req: NextRequest) {
  const body = await req.json();
  return createLocation("localities", LocalitySchema, body);
}   

export async function GET() {
  return getAllDocuments("localities");
}

