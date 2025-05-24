import { getAllDocuments } from "@/lib/getAllDocuments";
import { CompanySchema } from "@/db/company.schema";
import { createLocation } from "@/lib/createDocument";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  return createLocation("companies", CompanySchema, body);
}

export async function GET() {
  return getAllDocuments("companies");
}
