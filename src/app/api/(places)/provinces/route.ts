//use createLocation to create a province
import { createLocation } from "@/lib/createDocument";
import { ProvinceSchema } from "@/db/province.schema";
import { NextRequest } from "next/server";
import { getAllDocuments } from "@/lib/getAllDocuments";
export async function POST(req: NextRequest) {
  const body = await req.json();
  return createLocation("provinces", ProvinceSchema, body);
}

export async function GET() {
  return getAllDocuments("provinces");
}

