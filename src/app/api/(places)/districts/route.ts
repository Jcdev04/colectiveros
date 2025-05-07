//use createLocation to create a district
import { createLocation } from "@/lib/createDocument";
import { DistrictSchema } from "@/db/district.schema";
import { NextRequest } from "next/server";
import { getAllDocuments } from "@/lib/getAllDocuments";

export async function POST(req: NextRequest) {
  const body = await req.json();
  return createLocation("districts", DistrictSchema, body);
}

export async function GET() {
  return getAllDocuments("districts");
}

  
