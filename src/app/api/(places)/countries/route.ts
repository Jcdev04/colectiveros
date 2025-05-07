import { createLocation } from "@/lib/createDocument";
import { CountrySchema } from "@/db/country.schema";
import { NextRequest } from "next/server";
import { getAllDocuments} from "@/lib/getAllDocuments";

export async function POST(req: NextRequest) {
  const body = await req.json();
  return createLocation("countries", CountrySchema, body);
}
export async function GET() {
  return getAllDocuments("countries");
}
