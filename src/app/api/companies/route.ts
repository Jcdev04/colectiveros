import { getAllDocuments } from "@/lib/getAllDocuments";
import { CompanySchema } from "@/db/company.schema";
import { createLocation } from "@/lib/createDocument";

const ValidationCompanySchema = CompanySchema.omit({ user_id: true });
export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  return createLocation("companies", ValidationCompanySchema, body);
}

export async function GET() {
  return getAllDocuments("companies");
}
